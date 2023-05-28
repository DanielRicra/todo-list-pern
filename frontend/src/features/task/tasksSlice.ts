import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import type { SetTaskPayload, TaskDTO, TaskState } from '../../types';
 
const initialState: TaskState = {
	value: [],
	taskListId: 0,
	status: 'idle',
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action: PayloadAction<SetTaskPayload>) => {
			state.value = action.payload.tasks;
			state.taskListId = action.payload.taskListId;
		},
		saveNewTask: (state, action: PayloadAction<TaskDTO>) => {
			state.value.push(action.payload);
		},
		removeTask: (state, action: PayloadAction<number>) => {
			state.value = state.value.filter((task) => task.id !== action.payload);
		},
		updateTask: (state, action: PayloadAction<TaskDTO>) => {
			state.value = state.value.map((task) => (task.id === action.payload.id ? action.payload : task));
		},
	},
});
export const { setTasks, removeTask, updateTask, saveNewTask } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTasks = (state: { tasks: TaskState }) => state.tasks.value;
export const selectTaskListId = (state: { tasks: TaskState }) => state.tasks.taskListId;