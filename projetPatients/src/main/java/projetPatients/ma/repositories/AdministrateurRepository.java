package projetPatients.ma.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projetPatients.ma.entities.Administrateur;

import java.util.Optional;

@Repository
public interface AdministrateurRepository extends JpaRepository<Administrateur,Long> {
    Optional<Administrateur> findByName(String name);
}
