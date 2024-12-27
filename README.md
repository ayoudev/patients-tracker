# README for Your Application

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [File Structure](#file-structure)
7. [API Endpoints](#api-endpoints)
8. [Future Enhancements](#future-enhancements)
9. [Screenshots](#screenshots)
10. [Contributors](#Contributors)

    


## Introduction
This application is designed to manage patient data with a focus on safety monitoring and health tracking. It supports features such as patient registration, safety zone monitoring, notification creation for safety breaches, and anomaly detection based on predefined parameters. The admin is responsible for managing all patient-related information, including location data and safety zones.

## Features
- Add, update, and delete patient records
- Define and manage safety zones using GPS coordinates and radius
- Check if patients are within their defined safety zones
- Automatically create notifications for patients who leave their safety zones
- Monitor and display the last visit of each patient
- Fetch and update patient coordinates dynamically

## Prerequisites
Before you can run this application, ensure you have the following installed:

- Java Development Kit (JDK) 11 or higher
- Spring Boot Framework
- Maven (for dependency management)
- A database system (e.g., MySQL, PostgreSQL, or H2 for testing)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```
2. Build the project using Maven:
   ```bash
   mvn clean install
   ```
3. Configure the database connection in `application.properties`.
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

## Usage
1. Access the API via `http://localhost:8080/patients` or `http://localhost:8080/notifications`.
2. Available functionalities:
   - **Patients**:
     - Add new patients
     - Update patient information (e.g., coordinates, personal details)
     - Check if patients are within their safety zones
     - Retrieve and display patient details
   - **Notifications**:
     - View all notifications
     - Automatically generate notifications when patients leave their safety zones

## File Structure
```
project_root/
├── src/
│   ├── main/
│   │   ├── java/projetPatients/ma/controllers/
│   │   │   ├── PatientController.java
│   │   │   └── NotificationController.java
│   │   ├── entities/
│   │   │   ├── Patient.java
│   │   │   └── Notification.java
│   │   ├── repositories/
│   │   │   ├── PatientRepository.java
│   │   │   └── NotificationRepository.java
│   │   └── application/
│   └── test/
├── pom.xml
└── README.md
```

## API Endpoints
### Patient Controller
#### 1. Get All Patients
**Endpoint**: `/patients`
- **Method**: GET
- **Response**: List of all patients

#### 2. Get Patient by ID
**Endpoint**: `/patients/{id}`
- **Method**: GET
- **Response**: Patient details or 404 if not found

#### 3. Add Patient
**Endpoint**: `/patients`
- **Method**: POST
- **Request Body**: JSON object with patient details
- **Response**: Created patient object

#### 4. Update Patient
**Endpoint**: `/patients/{id}`
- **Method**: PUT
- **Request Body**: JSON object with updated patient details
- **Response**: Updated patient object or 404 if not found

#### 5. Update Patient Coordinates
**Endpoint**: `/patients/{id}/coordinates`
- **Method**: PATCH
- **Parameters**: `latitude`, `longitude`
- **Response**: Updated patient object or 404 if not found

#### 6. Get Patient Coordinates
**Endpoint**: `/patients/{id}/coordinates`
- **Method**: GET
- **Response**: Latitude and longitude of the patient

#### 7. Check Safety Zone
**Endpoint**: `/patients/{id}/safety-zone`
- **Method**: GET
- **Response**: Whether the patient is in the safety zone

#### 8. Delete Patient
**Endpoint**: `/patients/{id}`
- **Method**: DELETE
- **Response**: 204 No Content or 404 if not found

### Notification Controller
#### 1. Get All Notifications
**Endpoint**: `/notifications`
- **Method**: GET
- **Response**: List of all notifications

#### 2. Check and Notify
**Endpoint**: `/notifications/check/{patientId}`
- **Method**: POST
- **Response**: Message indicating whether a notification was created

## Future Enhancements
- Implement admin login functionality
- Divide the application into microservices for scalability and modularity
- Enhance UI for better interaction
- Add real-time safety zone monitoring with WebSocket notifications


## Screenshots

Landing Page 
![empty](https://github.com/user-attachments/assets/c2140b28-a8f6-4978-85e4-c84b49366eb6)
Locating patients Page
![WhatsApp Image 2024-12-25 à 11 48 57_8d157be0](https://github.com/user-attachments/assets/d284be1f-2895-404d-8b04-8809aa9bb71c)
Crud for patients Page
![WhatsApp Image 2024-12-25 à 11 52 39_c267ae8e](https://github.com/user-attachments/assets/738767bc-c20b-423d-924a-bd58a89695fe)
Adding a Patient Page
![WhatsApp Image 2024-12-25 à 11 52 49_08055cf5](https://github.com/user-attachments/assets/264d2129-b291-46ea-8b28-9b7fcd567959)
![WhatsApp Image 2024-12-25 à 11 52 59_6c5ee87f](https://github.com/user-attachments/assets/d09a9da6-2d78-47b9-a324-50430062d514)
Added Patient 
![WhatsApp Image 2024-12-25 à 11 55 07_e8e0c0a2](https://github.com/user-attachments/assets/1d1e57e0-f27a-4ab0-abe2-b28b9dbb5a13)
Updating a patient 
![WhatsApp Image 2024-12-25 à 11 55 22_707636b2](https://github.com/user-attachments/assets/59556d8a-bfd4-4a42-b3d9-7a54cf5d3647)
Updated a patient
![WhatsApp Image 2024-12-25 à 11 55 42_09173d4f](https://github.com/user-attachments/assets/751261bb-3edd-4da0-bab1-3712c30ce9c0)
Patient in safe zone
![WhatsApp Image 2024-12-25 à 11 57 14_5fd2d597](https://github.com/user-attachments/assets/9b08372a-f7de-44bf-a1d5-9fa1a72293d9)
Patient out of the safe zone
![WhatsApp Image 2024-12-25 à 11 57 34_f63c59d9](https://github.com/user-attachments/assets/561cc00b-cb94-43e1-96a8-a4d3cec1b462)
Alerts Page
![WhatsApp Image 2024-12-25 à 11 57 45_b9e1b486](https://github.com/user-attachments/assets/ede9c493-ad0b-44c2-9b14-4af9784a02e9)





A full demo video : 

https://drive.google.com/file/d/1ERJN5WVxsN-qGgHJdESS0FvUnpTAW46f/view?usp=drive_link


## Contributors 

Rouibah Salma
Imaghri Aya
Lachaal Kaoutar 
Ait Benhida Fatima Ezzahra 
