import { Outlet, Navigate, useNavigation } from 'react-router-dom';
import LoadingPages from '@/components/loading-pages';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/user/userSlice';

const Layout = () => {
	const navigation = useNavigation();
	return <>
		{navigation.state !== 'idle' && <LoadingPages />}
	</>;
};

const ProtectedRoutes = () => {
   const user = useAppSelector(selectUser);

   if (!user.accessToken) {
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
