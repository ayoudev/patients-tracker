package projetPatients.ma.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projetPatients.ma.entities.Notification;
import projetPatients.ma.entities.Patient;
import projetPatients.ma.repositories.NotificationRepository;
import projetPatients.ma.repositories.PatientRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepo;

    @Autowired
    private PatientRepository patientRepo;

    // Fetch all notifications
    public List<Notification> getAllNotifications() {
        return notificationRepo.findAll();
    }

    // Check if a patient is in the safety zone and create a notification if needed
    public String checkAndNotify(Long patientId) {
        Optional<Patient> optionalPatient = patientRepo.findById(patientId);

        if (optionalPatient.isPresent()) {
            Patient patient = optionalPatient.get();

            if (!patient.isInSafetyZone()) { // Assume Patient class has isInSafetyZone()
                Notification notification = new Notification(
                        0, // ID will be auto-generated
                        patient.getName(),
                        LocalDateTime.now(),
                        patient.getLatitude(),
                        patient.getLongitude(),
                        "Patient is out of the safety zone!"
                );

                notificationRepo.save(notification); // Save the notification
                return "Notification created for patient: " + patient.getName();
            } else {
                return "Patient is in the safety zone. No notification needed.";
            }
        } else {
            return "Patient with ID " + patientId + " not found!";
        }
    }
}
