package projetPatients.ma.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projetPatients.ma.entities.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

}
