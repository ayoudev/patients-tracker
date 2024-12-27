import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/common/Sidebar";

import AlertPage from "./pages/AlertPage";

import PatientsPage from "./pages/PatientsPage";


import LocatePatientsPage from "./pages/LocatePPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/loginPage";


function App() {
	return (
		<div className='flex h-screen bg-white text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='/' element={<AlertPage />} />
				<Route path='/patients' element={<PatientsPage />} />
				<Route path='/locatepatient' element={<LocatePatientsPage />} />
				<Route path='/settings' element={<SettingsPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;
