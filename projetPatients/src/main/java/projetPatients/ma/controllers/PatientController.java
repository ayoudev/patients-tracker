package projetPatients.ma.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projetPatients.ma.entities.Patient;
import projetPatients.ma.services.PatientService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Patient> addPatient(@RequestBody Patient patient) {
        return ResponseEntity.ok(patientService.addPatient(patient));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        return patientService.updatePatient(id, patientDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/coordinates")
    public ResponseEntity<Patient> updateCoordinates(@PathVariable Long id,
                                                     @RequestParam("latitude") double latitude,
                                                     @RequestParam("longitude") double longitude) {
        return patientService.updateCoordinates(id, latitude, longitude)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/safety-zone")
    public ResponseEntity<Map<String, Boolean>> checkSafetyZone(@PathVariable Long id) {
        Optional<Boolean> isInSafetyZone = patientService.checkSafetyZone(id);
        if (isInSafetyZone.isPresent()) {
            Map<String, Boolean> response = new HashMap<>();
            response.put("inSafetyZone", isInSafetyZone.get());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}
