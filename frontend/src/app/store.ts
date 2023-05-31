import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/task/taskSlice';
import taskListReducer from '../features/task-list/taskListSlice';

export const store = configureStore({
	reducer: {
      tasks: tasksReducer,
      taskList: taskListReducer
   },
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;