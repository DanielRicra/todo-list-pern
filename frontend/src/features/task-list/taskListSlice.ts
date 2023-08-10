import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { TaskList, TaskListDTO, TaskListState } from '../../types';
import { fetchTaskListById, fetchTaskListsByUserId, saveTaskList } from './taskListMiddleware';

const initialState: TaskListState = {
	value: [],
	currentTaskList: {
		taskListId: 0,
		name: '',
		userId: 0,
		tasks: [],
	},
	status: 'idle',
	error: '',
};

const taskListSlice = createSlice({
	name: 'taskList',
	initialState,
	reducers: {
		removeTaskList: (state, action: PayloadAction<number>) => {
			state.value = state.value.filter(
				(taskList) => taskList.taskListId !== action.payload
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTaskListsByUserId.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchTaskListsByUserId.fulfilled, (state, action: PayloadAction<TaskList[]>) => {
				state.status = 'fulfilled';
				state.value = action.payload;
			})
			.addCase(fetchTaskListsByUserId.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			.addCase(saveTaskList.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveTaskList.fulfilled, (state, action: PayloadAction<TaskList>) => {
				state.status = 'fulfilled';
				state.value.push(action.payload);
			})
			.addCase(saveTaskList.rejected, (state) => {
				state.status = 'rejected';
			})
			.addCase(fetchTaskListById.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchTaskListById.fulfilled, (state, action: PayloadAction<TaskListDTO>) => {
				state.status = 'fulfilled';
				state.currentTaskList = action.payload;
			})
			.addCase(fetchTaskListById.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			});
	},
});

export const { removeTaskList } =
	taskListSlice.actions;
export default taskListSlice.reducer;

export const selectTaskLists = (state: { taskList: TaskListState }) =>
	state.taskList.value;
