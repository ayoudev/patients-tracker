import { Lock, User } from "lucide-react"; // Icônes pour le formulaire de connexion
import { motion } from "framer-motion";
import Header from "../components/common/Header";

const LoginPage = () => {
	return (
		<div className='flex-1 flex justify-center items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
			<motion.div
				className='w-full max-w-md space-y-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<Header title='Login' />

				{/* Formulaire de connexion */}
				<form className='mt-8 space-y-6' action='#' method='POST'>
					<div className='rounded-md shadow-sm'>
						<div className='mb-6'>
							<label htmlFor='email' className='block text-sm font-medium text-gray-700'>
								Email Address
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
						</div>

						<div className='mb-6'>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
								<User className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400' aria-hidden='true' />
							</span>
							Sign in
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
};

export default LoginPage;
