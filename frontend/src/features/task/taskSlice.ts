import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import type { TaskDTO, TaskListDTO, TaskState } from '../../types';
import { fetchTasksByTaskListId, saveTask, updateTask } from './taskMiddleware';

const initialState: TaskState = {
	value: {
		taskListId: 0,
		name: '',
		userId: 0,
		tasks: [],
	},
	status: 'idle',
	error: '',
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasksByTaskListId.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(
				fetchTasksByTaskListId.fulfilled,
				(state, action: PayloadAction<TaskListDTO>) => {
					state.status = 'fulfilled';
					state.value = action.payload;
				}
			)
			.addCase(fetchTasksByTaskListId.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			.addCase(
				saveTask.fulfilled,
				(state, action: PayloadAction<TaskDTO>) => {
					state.status = 'fulfilled';
					state.value.tasks.push(action.payload);
				}
			)
			.addCase(
				updateTask.fulfilled,
				(state, action: PayloadAction<TaskDTO>) => {
					state.status = 'fulfilled';
					state.value.tasks = state.value.tasks.map((task) =>
						task.taskId === action.payload.taskId ? action.payload : task
					);
				}
			);
	},
});

export default tasksSlice.reducer;

export const selectTasks = (state: { tasks: TaskState }) => state.tasks;
