import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import NotificationModal from "../components/common/NotificationModal"; // Assuming you have a modal component

// Fix for Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png", // Ensure correct local path for icons
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

// Custom hook to update map center and zoom
const UpdateMapView = ({ position, zoomLevel }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, zoomLevel); // Manually setting the center and zoom level
    }
  }, [position, zoomLevel, map]);

  return null;
};

const LocatePatientsPage = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [patients, setPatients] = useState([]); // List of patients
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient ID
  const [patientInfo, setPatientInfo] = useState(null); // Patient info (latitude, longitude, safety zone, etc.)
  const [isOutOfSafetyZone, setIsOutOfSafetyZone] = useState(false); // Track if the patient is out of safety zone
  const [showNotification, setShowNotification] = useState(false); // Show notification modal

  useEffect(() => {
    // Fetch the list of patients from backend
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8080/patients");

        if (!response.ok) {
          console.error("Failed to fetch patients, status:", response.status);
          return;
        }

        const data = await response.json();
        setPatients(data); // Set patients data
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    // Fetch the selected patient's coordinates when the patient ID changes
    const fetchPatientLocation = async () => {
      if (selectedPatientId === null) return; // No patient selected

      try {
        const response = await fetch(`http://localhost:8080/patients/${selectedPatientId}`);

        if (!response.ok) {
          console.error("Failed to fetch data, status:", response.status);
          return;
        }
        
        const data = await response.json();
        console.log("Backend response:", data);
       
        // Check if latitude and longitude are valid numbers
        if (data && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          const formattedLastVisit = new Date(data.lastVisit).toLocaleString();
          setPosition([data.latitude, data.longitude]);
          setLocationLoaded(true); 
          console.log("Patient data received:", data);
       
          // Setting the relevant patient info
        
          setPatientInfo({  
            latitude: data.latitude,
            longitude: data.longitude,
            safetyLatitude: data.safetyLatitude,
            safetyLongitude: data.safetyLongitude,
            safetyRadius: data.safetyRadius,
            lastVisit: formattedLastVisit,
            inSafetyZone: data.inSafetyZone ? "Yes" : "No", // Convert boolean to Yes/No
          });

          // Check if the patient is out of the safety zone
          if (data.inSafetyZone === false) {
            setIsOutOfSafetyZone(true);
            setShowNotification(true); // Show the notification if out of safety zone

            // Send a request to create the notification in the backend
            await notifyPatientOutOfZone(data.id);
          } else {
            setIsOutOfSafetyZone(false);
            setShowNotification(false); // Hide the notification if in safety zone
          }
        } else {
          console.error("Invalid coordinates received:", data);
        }
      } catch (error) {
        console.error("Error fetching patient location:", error);
      }
    };

    fetchPatientLocation();
    
    // Set interval to refresh patient location every 5 seconds
    const interval = setInterval(fetchPatientLocation, 5000); // 5 seconds interval
    return () => clearInterval(interval); // Cleanup interval on component unmount

  }, [selectedPatientId]); // Run when the selected patient changes

  // Function to notify patient out of safety zone
  const notifyPatientOutOfZone = async (patientId) => {
    try {
      const response = await fetch(`http://localhost:8080/notifications/check/${patientId}`, {
        method: "POST",
      });

      if (response.ok) {
        console.log("Notification created successfully");
      } else {
        console.error("Failed to create notification");
      }
    } catch (error) {
      console.error("Error sending notification request:", error);
    }
  };

  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: "/map_marker.png", // Assuming it's in the public folder
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-700">
      <Header title={"Locate Patients"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="my-8">
          <div className="flex justify-center items-center mb-8">
            <h2 className="text-xl font-semibold text-white mr-4">Select Patient</h2>
            <select
              className="p-3 bg-white rounded-lg w-64 text-gray-900"
              onChange={(e) => setSelectedPatientId(e.target.value)}
              value={selectedPatientId || ""}
            >
              <option value="" disabled>Select a Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} {/* Adjust this field based on your API response */}
                </option>
              ))}
            </select>
          </div>

          <h2 className="text-xl font-semibold text-white mb-4">Patient Location</h2>
          <div className="h-96">
            <MapContainer center={position} zoom={16} className="h-full w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locationLoaded && (
                <>
                  <Marker position={position} icon={customIcon}>
                    <Popup>Patient is here!</Popup>
                  </Marker>

                  {/* Add Circle for the Safety Zone */}
                  {patientInfo && patientInfo.safetyLatitude && patientInfo.safetyLongitude && patientInfo.safetyRadius && (
                    <>
                      {/* Green Circle for In Safety Zone */}
                      {patientInfo.inSafetyZone === "Yes" && (
                        <Circle
                          center={[patientInfo.safetyLatitude, patientInfo.safetyLongitude]}
                          radius={patientInfo.safetyRadius} // Safety radius in meters
                          color="green"
                          fillColor="green"
                          fillOpacity={0.3}
                        >
                          <Popup>In Safe Zone</Popup>
                        </Circle>
                      )}

                      {/* Red Circle for Out of Safety Zone - centered on patient's current location */}
                      {patientInfo.inSafetyZone === "No" && (
                        <Circle
                          center={[patientInfo.latitude, patientInfo.longitude]} // Center on patient's current location
                          radius={100} // Adjust radius as needed to indicate a warning area around the patient
                          color="red"
                          fillColor="red"
                          fillOpacity={0.3}
                        >
                          <Popup>Out of Safe Zone</Popup>
                        </Circle>
                      )}
                    </>
                  )}
                  <UpdateMapView position={position} zoomLevel={16} />
                </>
              )}
            </MapContainer>
          </div>

          {patientInfo && (
            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-lg font-semibold mb-4">Patient Location Info</h3>
              <div className="space-y-4">
                <div><strong>Latitude:</strong> {patientInfo.latitude}</div>
                <div><strong>Longitude:</strong> {patientInfo.longitude}</div>
                <div><strong>Safety Latitude:</strong> {patientInfo.safetyLatitude}</div>
                <div><strong>Safety Longitude:</strong> {patientInfo.safetyLongitude}</div>
                <div><strong>Safety Radius:</strong> {patientInfo.safetyRadius} meters</div>
                <div><strong>Last Visit:</strong> {patientInfo.lastVisit}</div>
                <div><strong>In Safety Zone:</strong> {patientInfo.inSafetyZone}</div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Show Notification Modal */}
      {showNotification && <NotificationModal message="Patient is out of the safe zone!" />}
    </div>
  );
};

export default LocatePatientsPage;
