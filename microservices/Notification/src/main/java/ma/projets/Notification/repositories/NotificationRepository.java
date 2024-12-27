package ma.projets.Notification.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ma.projets.Notification.entities.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
