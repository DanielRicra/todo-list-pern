import { useAppDispatch } from '@/app/hooks';
import { clearUser, setUser } from '@/features/user/userSlice';
import { UserWithTokens } from '@/types';

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const saveUser = (user: UserWithTokens) => {
		dispatch(setUser(user));
	};

	const removeUser = () => {
		dispatch(clearUser);
	};

	return {
		saveUser,
		removeUser,
	};
};
