import React, { useState } from "react";

const AddPatientForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [safetyLatitude, setSafetyLatitude] = useState("");
  const [safetyLongitude, setSafetyLongitude] = useState("");
  const [safetyRadius, setSafetyRadius] = useState("");
  const [gender, setGender] = useState(""); // New field
  const [address, setAddress] = useState(""); // New field
  const [phoneNumber, setPhoneNumber] = useState(""); // New field
  const [medicalCondition, setMedicalCondition] = useState(""); // New field

  const [currentPage, setCurrentPage] = useState(1); // Track which page of the form the user is on
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Collect form data
    const patientData = {
      name,
      gender,
      address,
      phoneNumber,
      medicalCondition,
      latitude,
      longitude,
      acceleration,
      safetyLatitude,
      safetyLongitude,
      safetyRadius
    };
  
    // Send POST request with JSON payload
    try {
      const response = await fetch('http://localhost:8080/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });
  
      // Handle the response
      if (response.ok) {
        console.log('Patient added successfully');
        onClose(); // Close the form after successful submission
      } else {
        console.error('Failed to add patient:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-4">
        {currentPage === 1 ? "Personal Info" : "Location Info"}
      </h2>
      <form onSubmit={handleSubmit}>
        {currentPage === 1 && (
          <div className="space-y-4">
            {/* Personal Info Section */}
            <div>
              <label className="block text-gray-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
  <label className="block text-gray-300">Gender</label>
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    <option value="" disabled>Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</div>

            <div>
              <label className="block text-gray-300">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-300">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-gray-300">Medical Condition</label>
              <input
                type="text"
                value={medicalCondition}
                onChange={(e) => setMedicalCondition(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="space-y-4">
            {/* Location Info Section */}
            <div>
              <label className="block text-gray-300">Latitude</label>
              <input
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Longitude</label>
              <input
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Acceleration</label>
              <input
                type="number"
                value={acceleration}
                onChange={(e) => setAcceleration(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Safety Latitude</label>
              <input
                type="number"
                value={safetyLatitude}
                onChange={(e) => setSafetyLatitude(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Safety Longitude</label>
              <input
                type="number"
                value={safetyLongitude}
                onChange={(e) => setSafetyLongitude(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Safety Radius</label>
              <input
                type="number"
                value={safetyRadius}
                onChange={(e) => setSafetyRadius(e.target.value)}
                className="w-full p-2 border rounded text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentPage === 2 && (
            <button
              type="button"
              onClick={handlePrevPage}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Previous
            </button>
          )}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            {currentPage === 2 ? (
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Patient
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextPage}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPatientForm;
