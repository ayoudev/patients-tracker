import React, { useState } from "react";

const UpdatePatientForm = ({ patient, onClose }) => {
  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState(patient.age);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle updating patient logic here
    console.log("Updated Patient:", { name, age });
    onClose(); // Close the form after submitting
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Update Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePatientForm;
