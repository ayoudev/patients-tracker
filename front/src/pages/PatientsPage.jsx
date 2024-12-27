import { UserPlus, Users } from "lucide-react"; // Add Users icon for Show Users card
import { useState } from "react";

import Header from "../components/common/Header";
import UsersTable from "../components/Patients/PatientsTable"; // Your table component
import AddPatientForm from "../components/Patients/AddPatient"; // Add Patient Form

const PatientsPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formMode, setFormMode] = useState(null); // 'add'
  const [selectedPatient, setSelectedPatient] = useState(null); // Patient to be shown or added
  const [showTable, setShowTable] = useState(true); // Table is visible initially

  // Handlers for each action
  const handleAddPatient = () => {
    setFormMode("add");
    setIsFormVisible(true);
    setShowTable(false); // Hide table when adding a patient
  };

  const handleShowPatients = () => {
    setShowTable(true); // Show Patients Table
    setIsFormVisible(false); // Hide form if it's visible
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setFormMode(null);
    setSelectedPatient(null);
    setShowTable(true); // After form close, show the table again
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Patients" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Cards Section */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          {/* Add Patient Card */}
          <div
            onClick={handleAddPatient}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 flex items-center space-x-4 cursor-pointer hover:shadow-xl transition"
          >
            <div className="p-3 rounded-full bg-green-100">
              <UserPlus className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Add Patient</h4>
              <p className="text-sm text-gray-400">Add a new patient to the database.</p>
            </div>
          </div>

          {/* Show Patient Card */}
          <div
            onClick={handleShowPatients}
            className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 flex items-center space-x-4 cursor-pointer hover:shadow-xl transition"
          >
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Show Patients</h4>
              <p className="text-sm text-gray-400">View the list of patients.</p>
            </div>
          </div>
        </div>

        {/* Conditional rendering of form or table */}
        <section>
          {isFormVisible ? (
            formMode === "add" ? (
              <AddPatientForm onClose={handleFormClose} />
            ) : null // Handle other form modes if necessary
          ) : showTable ? (
            <>
              <h2 className="text-xl font-semibold text-white mb-4">Patients List</h2>
              <UsersTable />
            </>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default PatientsPage;
