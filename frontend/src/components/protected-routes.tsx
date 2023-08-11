import { Outlet, Navigate, useNavigation } from 'react-router-dom';
import LoadingPages from '@/components/loading-pages';

const Layout = () => {
	const navigation = useNavigation();
	return <>
		{navigation.state !== 'idle' && <LoadingPages />}
	</>;
};

const ProtectedRoutes = () => {
   const user = localStorage.getItem('user');

   if (!user) {
      return <Navigate to="/login" />;
   }

	return (
		<>
			<Layout />
			<Outlet />
		</>
	);
};
export default ProtectedRoutes;
