import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TaskList, TaskListState } from '../../types';

const initialState: TaskListState = {
	value: [],
	status: 'idle',
};
// TODO: make the middleware thunks function, and the services to connect to API
const taskListSlice = createSlice({
	name: 'taskList',
	initialState,
	reducers: {
		setTaskLists: (state, action: PayloadAction<TaskList[]>) => {
			state.value = action.payload;
		},
      addTaskList: (state, action: PayloadAction<TaskList>) => {
         state.value.push(action.payload);
      },
      removeTaskList: (state, action: PayloadAction<number>) => {
         state.value = state.value.filter(taskList => taskList.taskListId !== action.payload);
      }
	},
});

export const { setTaskLists, addTaskList, removeTaskList } = taskListSlice.actions;
export default taskListSlice.reducer;

export const selectTaskLists = (state: { taskList: TaskListState}) => state.taskList.value;