package ma.projets.Patient.controllers;

import ma.projets.Patient.entities.Patient;
import ma.projets.Patient.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            return ResponseEntity.ok(patient.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Patient> addPatient(@RequestBody Patient patient) {
        // Set the lastVisit to the current date and time when creating the patient
        patient.setLastVisit(java.time.LocalDateTime.now());
        Patient savedPatient = patientRepository.save(patient);
        return ResponseEntity.ok(savedPatient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        Optional<Patient> existingPatient = patientRepository.findById(id);
        if (existingPatient.isPresent()) {
            Patient patient = existingPatient.get();
            // Update patient info here
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

            // Update lastVisit to current date and time when patient info is updated
            patient.setLastVisit(java.time.LocalDateTime.now());

            Patient updatedPatient = patientRepository.save(patient);
            return ResponseEntity.ok(updatedPatient);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            patientRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/coordinates")
    public ResponseEntity<Patient> updatePatientCoordinates(@PathVariable Long id,
                                                            @RequestParam("latitude") double latitude,
                                                            @RequestParam("longitude") double longitude) {
        Optional<Patient> existingPatient = patientRepository.findById(id);
        if (existingPatient.isPresent()) {
            Patient patient = existingPatient.get();
            // Update coordinates
            patient.setLatitude(latitude);
            patient.setLongitude(longitude);

            // Update lastVisit to current date and time when coordinates are changed
            patient.setLastVisit(java.time.LocalDateTime.now());

            Patient updatedPatient = patientRepository.save(patient);
            return ResponseEntity.ok(updatedPatient);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/coordinates")
    public ResponseEntity<Map<String, Double>> getPatientCoordinates(@PathVariable Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            Patient existingPatient = patient.get();
            Map<String, Double> coordinates = new HashMap<>();
            coordinates.put("latitude", existingPatient.getLatitude());
            coordinates.put("longitude", existingPatient.getLongitude());

            return ResponseEntity.ok(coordinates);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/safety-zone")
    public ResponseEntity<Map<String, Boolean>> checkSafetyZone(@PathVariable Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            Patient existingPatient = patient.get();
            boolean isInSafetyZone = existingPatient.isInSafetyZone();
            Map<String, Boolean> response = new HashMap<>();
            response.put("inSafetyZone", isInSafetyZone);

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}
