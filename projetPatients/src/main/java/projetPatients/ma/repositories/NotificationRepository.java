package projetPatients.ma.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projetPatients.ma.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
