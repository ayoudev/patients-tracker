package projetPatients.ma.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projetPatients.ma.entities.Patient;
import projetPatients.ma.repositories.PatientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient addPatient(Patient patient) {
        patient.setLastVisit(java.time.LocalDateTime.now());
        return patientRepository.save(patient);
    }

    public Optional<Patient> updatePatient(Long id, Patient patientDetails) {
        return patientRepository.findById(id).map(patient -> {
            patient.setName(patientDetails.getName());
            patient.setGender(patientDetails.getGender());
            patient.setAddress(patientDetails.getAddress());
            patient.setPhoneNumber(patientDetails.getPhoneNumber());
            patient.setMedicalCondition(patientDetails.getMedicalCondition());
            patient.setLatitude(patientDetails.getLatitude());
            patient.setLongitude(patientDetails.getLongitude());
            patient.setSafetyLatitude(patientDetails.getSafetyLatitude());
            patient.setSafetyLongitude(patientDetails.getSafetyLongitude());
            patient.setSafetyRadius(patientDetails.getSafetyRadius());
            patient.setLastVisit(java.time.LocalDateTime.now());
            return patientRepository.save(patient);
        });
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public Optional<Patient> updateCoordinates(Long id, double latitude, double longitude) {
        return patientRepository.findById(id).map(patient -> {
            patient.setLatitude(latitude);
            patient.setLongitude(longitude);
            patient.setLastVisit(java.time.LocalDateTime.now());
            return patientRepository.save(patient);
        });
    }

    public Optional<Boolean> checkSafetyZone(Long id) {
        return patientRepository.findById(id).map(Patient::isInSafetyZone);
    }
}
