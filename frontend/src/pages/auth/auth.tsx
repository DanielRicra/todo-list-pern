import { Link, useLocation } from 'react-router-dom';
import LoginForm from './components/login-form';
import SignUpForm from './components/sign-up-form';

const AuthPage = () => {
	const params = useLocation();
	const isLogin = params.pathname.includes('login');

	return (
		<div className="min-h-screen w-full flex justify-center items-center flex-col bg-[#181820] text-white">
			<h1 className="text-3xl font-medium mb-5">
				{isLogin ? 'Login' : 'Sign Up'}
			</h1>

			{isLogin ? <LoginForm /> : <SignUpForm />}

			<div className="text-gray-300 mt-2">
				{isLogin ? 'No account?' : 'Already have an account?'}
				<Link
					to={isLogin ? '/signup' : '/login'}
					className="ml-2 underline hover:opacity-80"
				>
					{isLogin ? 'Sign Up' : 'Login'}
				</Link>
			</div>
		</div>
	);
};

export default AuthPage;
