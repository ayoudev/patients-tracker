import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";

const UsersTable = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [patients, setPatients] = useState([]); // State to store all patients from the API
	const [filteredPatients, setFilteredPatients] = useState([]); // State to store filtered patients
	const [selectedPatient, setSelectedPatient] = useState(null); // State to store the selected patient for editing
	const [isEditing, setIsEditing] = useState(false); // State to toggle between viewing and editing form
	const [formData, setFormData] = useState({ name: "", phoneNumber: "", address: "", medicalCondition: "", gender: "" });

	// Fetch data from the API
	useEffect(() => {
		const fetchPatients = async () => {
			try {
				const response = await axios.get("http://localhost:8080/patients");
				setPatients(response.data); // Assuming API response is an array of patients
				setFilteredPatients(response.data); // Set filtered patients to the full list initially
			} catch (error) {
				console.error("Error fetching patients:", error);
			}
		};

		fetchPatients();
	}, []);

	// Handle search input
	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = patients.filter(
			(patient) =>
				(patient.name && patient.name.toLowerCase().includes(term)) ||
				(patient.address && patient.address.toLowerCase().includes(term)) ||
				(patient.phoneNumber && patient.phoneNumber.toLowerCase().includes(term)) ||
				(patient.gender && patient.gender.toLowerCase().includes(term))
		);
		setFilteredPatients(filtered);
	};

	// Handle Edit button click
	const handleEdit = (patient) => {
		setSelectedPatient(patient);
		setFormData({
			name: patient.name || "",
			phoneNumber: patient.phoneNumber || "",
			address: patient.address || "",
			medicalCondition: patient.medicalCondition || "",
			gender: patient.gender || "",
		});
		setIsEditing(true); // Show the edit form
	};

	// Handle Delete button click
	const handleDelete = async (patientId) => {
		try {
			await axios.delete(`http://localhost:8080/patients/${patientId}`);
			setPatients(patients.filter((patient) => patient.id !== patientId)); // Update state to remove deleted patient
			setFilteredPatients(filteredPatients.filter((patient) => patient.id !== patientId)); // Remove from filtered list
		} catch (error) {
			console.error("Error deleting patient:", error);
		}
	};

	// Handle form submission (Update patient)
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(`http://localhost:8080/patients/${selectedPatient.id}`, formData);
			const updatedPatient = response.data;
			setPatients(
				patients.map((patient) =>
					patient.id === updatedPatient.id ? updatedPatient : patient
				)
			); // Update the patients state with the edited data
			setFilteredPatients(
				filteredPatients.map((patient) =>
					patient.id === updatedPatient.id ? updatedPatient : patient
				)
			); // Update the filtered patients list as well
			setIsEditing(false); // Close the form after submitting
		} catch (error) {
			console.error("Error updating patient:", error);
		}
	};

	// Handle form input change
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			{/* Search Bar */}
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold text-gray-100">Patients</h2>
				<div className="relative">
					<input
						type="text"
						placeholder="Search patients..."
						className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
				</div>
			</div>

			{/* Edit Form (Visible when editing a patient) */}
			{isEditing && (
				<div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
					<h3 className="text-xl font-semibold text-gray-100 mb-4">Edit Patient</h3>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-400">Name</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className="w-full px-4 py-2 mt-1 bg-gray-800 text-gray-300 rounded-lg focus:outline-none"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-400">Phone Number</label>
							<input
								type="text"
								name="phoneNumber"
								value={formData.phoneNumber}
								onChange={handleInputChange}
								className="w-full px-4 py-2 mt-1 bg-gray-800 text-gray-300 rounded-lg focus:outline-none"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-400">Address</label>
							<input
								type="text"
								name="address"
								value={formData.address}
								onChange={handleInputChange}
								className="w-full px-4 py-2 mt-1 bg-gray-800 text-gray-300 rounded-lg focus:outline-none"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-400">Medical Condition</label>
							<input
								type="text"
								name="medicalCondition"
								value={formData.medicalCondition}
								onChange={handleInputChange}
								className="w-full px-4 py-2 mt-1 bg-gray-800 text-gray-300 rounded-lg focus:outline-none"
							/>
						</div>

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-400">Gender</label>
							<input
								type="text"
								name="gender"
								value={formData.gender}
								onChange={handleInputChange}
								className="w-full px-4 py-2 mt-1 bg-gray-800 text-gray-300 rounded-lg focus:outline-none"
							/>
						</div>

						<button
							type="submit"
							className="w-full py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-500"
						>
							Save Changes
						</button>
					</form>
				</div>
			)}

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phone Number</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Address</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Medical Condition</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Gender</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">In Safety Zone</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-700">
						{filteredPatients.map((patient) => (
							<motion.tr
								key={patient.id}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
							>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-gray-100">{patient.name || "N/A"}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-300">{patient.phoneNumber || "N/A"}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-300">{patient.address || "N/A"}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-300">{patient.medicalCondition || "N/A"}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-300">{patient.gender || "N/A"}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
											patient.inSafetyZone
												? "bg-green-800 text-green-100"
												: "bg-red-800 text-red-100"
										}`}
									>
										{patient.inSafetyZone ? "Yes" : "No"}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
									<button
										className="text-indigo-400 hover:text-indigo-300 mr-2"
										onClick={() => handleEdit(patient)}
									>
										Edit
									</button>
									<button
										className="text-red-400 hover:text-red-300"
										onClick={() => handleDelete(patient.id)}
									>
										Delete
									</button>
								</td>
							</motion.tr>
						))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default UsersTable;
