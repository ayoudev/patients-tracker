package ma.projets.Admin.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ma.projets.Admin.entities.Administrateur;

import java.util.Optional;

@Repository
public interface AdministrateurRepository extends JpaRepository<Administrateur,Long> {
    Optional<Administrateur> findByName(String name);
}
