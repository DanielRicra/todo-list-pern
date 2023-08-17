import { STORAGE_STORE_KEY } from '@/constants';
import { UserState, UserWithTokens } from '@/types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const DEFAULT_STATE: UserWithTokens = {
	accessToken: '',
	refreshToken: '',
	userId: '',
	email: '',
	name: '',
};

const initialState: UserWithTokens = (() => {
	const persistedState = localStorage.getItem(STORAGE_STORE_KEY);
	if (persistedState) {
		return JSON.parse(persistedState).user.value;
	}
	return DEFAULT_STATE;
})();

const userSlice = createSlice({
	name: 'user',
	initialState: { value: initialState },
	reducers: {
		setUser: (state, action: PayloadAction<UserWithTokens>) => {
			state.value = action.payload;
		},
		clearUser: (state) => {
			state.value = DEFAULT_STATE;
		},
		refreshToken: (state, action: PayloadAction<string>) => {
			state.value.accessToken = action.payload;
		},
	},
});

export const { setUser, clearUser, refreshToken } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.value;

export default userSlice.reducer;
