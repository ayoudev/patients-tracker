package ma.projets.Patient.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Data  // This annotation automatically generates @Getter and @Setter
@Entity

@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private double latitude;
    private double longitude;
    private String gender;
    private String address;
    private String phoneNumber;
    private String medicalCondition;


    private LocalDateTime lastVisit;

    // Safety Zone properties
    private double safetyLatitude;
    private double safetyLongitude;
    private double safetyRadius; // Radius in meters (or kilometers)

    public Patient(String name, double latitude, double longitude, double acceleration, LocalDateTime lastVisit,
                   double safetyLatitude, double safetyLongitude, double safetyRadius) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;

        this.lastVisit = lastVisit;
        this.safetyLatitude = safetyLatitude;
        this.safetyLongitude = safetyLongitude;
        this.safetyRadius = safetyRadius;
    }

    // Method to check if the patient is in the safety zone
    public boolean isInSafetyZone() {
        double distance = calculateDistance(latitude, longitude, safetyLatitude, safetyLongitude);
        return distance <= safetyRadius;
    }



    // Haversine formula to calculate the distance between two GPS points
    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371e3; // Radius of the Earth in meters
        double φ1 = Math.toRadians(lat1);
        double φ2 = Math.toRadians(lat2);
        double Δφ = Math.toRadians(lat2 - lat1);
        double Δλ = Math.toRadians(lon2 - lon1);

        double a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMedicalCondition() {
        return medicalCondition;
    }

    public void setMedicalCondition(String medicalCondition) {
        this.medicalCondition = medicalCondition;
    }



    public LocalDateTime getLastVisit() {
        return lastVisit;
    }

    public void setLastVisit(LocalDateTime lastVisit) {
        this.lastVisit = lastVisit;
    }

    public double getSafetyLatitude() {
        return safetyLatitude;
    }

    public void setSafetyLatitude(double safetyLatitude) {
        this.safetyLatitude = safetyLatitude;
    }

    public double getSafetyLongitude() {
        return safetyLongitude;
    }

    public void setSafetyLongitude(double safetyLongitude) {
        this.safetyLongitude = safetyLongitude;
    }

    public double getSafetyRadius() {
        return safetyRadius;
    }

    public void setSafetyRadius(double safetyRadius) {
        this.safetyRadius = safetyRadius;
    }

    public Patient() {
    }
}
