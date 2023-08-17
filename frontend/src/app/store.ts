import { type Middleware, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import userReducer from '../features/user/userSlice';
import { taskListApi } from '@/services/task-list';
import { STORAGE_STORE_KEY } from '@/constants';

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem(STORAGE_STORE_KEY, JSON.stringify(store.getState()));
	};

export const store = configureStore({
	reducer: {
		user: userReducer,
		[taskListApi.reducerPath]: taskListApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(taskListApi.middleware)
			.concat(persistanceLocalStorageMiddleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
