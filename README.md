# README de l'Application de Suivi des Patients

## Table des Matières
1. [Introduction](#introduction)
2. [Fonctionnalités](#fonctionnalités)
3. [Prérequis](#prérequis)
4. [Installation](#installation)
5. [Utilisation](#utilisation)
6. [Structure des Fichiers](#structure-des-fichiers)
7. [Points de Terminaison API](#points-de-terminaison-api)
8. [Améliorations Futures](#améliorations-futures)
9. [Captures d'Écran](#captures-décran)
10. [Contributeurs](#contributeurs)

---

## Introduction
Cette application est conçue pour gérer les données des patients avec un accent sur la surveillance de leur sécurité et le suivi de leur santé. Elle permet la gestion des enregistrements des patients, la définition de zones de sécurité, et la création de notifications en cas de sortie des zones définies.

## Fonctionnalités
- Ajouter, mettre à jour et supprimer des enregistrements de patients.
- Définir et gérer des zones de sécurité à l'aide de coordonnées GPS et d'un rayon.
- Vérifier si les patients se trouvent dans leurs zones de sécurité.
- Créer automatiquement des notifications lorsque les patients quittent leurs zones de sécurité.
- Afficher la dernière visite de chaque patient.
- Récupérer et mettre à jour dynamiquement les coordonnées des patients.

## Prérequis
Avant d'exécuter cette application, assurez-vous d'avoir installé :
- Java Development Kit (JDK) 11 ou supérieur.
- Spring Boot Framework.
- Maven (pour la gestion des dépendances).
- Un système de base de données (par exemple, MySQL, PostgreSQL, ou H2 pour les tests).

## Installation
1. Clonez le dépôt :
   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```
2. Compilez le projet avec Maven :
   ```bash
   mvn clean install
   ```
3. Configurez la connexion à la base de données dans le fichier `application.properties`.
4. Lancez l'application :
   ```bash
   mvn spring-boot:run
   ```

## Utilisation
1. Accédez à l'API via :
   - `http://localhost:8080/patients`
   - `http://localhost:8080/notifications`
2. Fonctionnalités disponibles :
   - **Patients** :
     - Ajouter de nouveaux patients.
     - Mettre à jour les informations des patients (par exemple, coordonnées, détails personnels).
     - Vérifier si les patients se trouvent dans leurs zones de sécurité.
     - Récupérer et afficher les détails des patients.
   - **Notifications** :
     - Afficher toutes les notifications.
     - Générer automatiquement des notifications lorsque les patients quittent leurs zones de sécurité.

## Structure des Fichiers
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
│   │   ├── services/
│   │   │   ├── PatientService.java
│   │   │   └── NotificationService.java
│   │   └── repositories/
│   │       ├── PatientRepository.java
│   │       └── NotificationRepository.java
├── resources/
│   ├── application.properties
│   ├── data.sql
│   └── schema.sql
```

## Points de Terminaison API
- **GET /patients** : Récupère tous les patients.
- **POST /patients** : Ajoute un nouveau patient.
- **PUT /patients/{id}** : Met à jour les informations d'un patient.
- **DELETE /patients/{id}** : Supprime un patient.
- **GET /notifications** : Récupère toutes les notifications.
- **POST /notifications** : Crée une nouvelle notification.

## Améliorations Futures
- Ajout d'une interface utilisateur pour interagir avec l'application.
- Notifications en temps réel avec des services de messagerie.
- Intégration de cartes interactives pour la gestion des zones de sécurité.
- Tableau de bord analytique pour suivre les anomalies.

## Captures d'Écran
*Ajoutez ici des captures d'écran illustrant les principales fonctionnalités de l'application.*

## Contributeurs
- **Votre Nom** ([Votre GitHub](https://github.com/votre-profil))
