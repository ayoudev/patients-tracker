package projetPatients.ma.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projetPatients.ma.entities.Notification;
import projetPatients.ma.services.NotificationService;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // Endpoint to fetch all notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    // Check if a patient is out of the safe zone and create a notification
    @PostMapping("/check/{patientId}")
    public ResponseEntity<String> checkAndNotify(@PathVariable Long patientId) {
        String response = notificationService.checkAndNotify(patientId);
        return ResponseEntity.ok(response);
    }
}
