package ma.projets.Notification.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ma.projets.Notification.entities.Notification;

import ma.projets.Notification.repositories.NotificationRepository;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepo;

    @Autowired
    private PatientRepository patientRepo;

    // Endpoint to fetch all notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationRepo.findAll();
        return ResponseEntity.ok(notifications);
    }




    // Check if a patient is out of the safe zone and create a notification
    @PostMapping("/check/{patientId}")
    public String checkAndNotify(@PathVariable Long patientId) {
        Optional<Patient> optionalPatient = patientRepo.findById(patientId);

        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();

            if (!patient.isInSafetyZone()) { // Assume Patient class has isInSafetyZone()
                Notification notification = new Notification(
                        0, // ID will be auto-generated
                        patient.getName(),
                        java.time.LocalDateTime.now(), // Current timestamp
                        patient.getLatitude(),
                        patient.getLongitude(),
                        "Patient is out of the safety zone!"
                );
                System.out.println("Saving notification: " + notification);
                notificationRepo.save(notification); // Save the notification globally
                return "Notification created for patient: " + patient.getName();
            } else {
                return "Patient is in the safety zone. No notification needed.";
            }
        } else {
            return "Patient with ID " + patientId + " not found!";
        }
    }
}
