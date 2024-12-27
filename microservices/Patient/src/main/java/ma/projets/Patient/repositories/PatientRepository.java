package ma.projets.Patient.repositories;

import ma.projets.Patient.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository

public interface PatientRepository extends JpaRepository<Patient, Long> {

}
