import { createAsyncThunk } from '@reduxjs/toolkit';
import services from '../../services/taskListService';
import { TaskList, TaskListDTO } from '../../types';

export const fetchTaskListsByUserId = createAsyncThunk(
	'taskList/fetchTaskLists',
	async (userId: number,  thunkAPI) => {
		try {
			return (await services.getTaskListsByUserId(userId) as TaskList[]);
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('Something went wrong');
		}
	}
);

export const fetchTaskListById = createAsyncThunk(
	'taskList/fetchTaskList',
	async (taskListId: number, thunkAPI) => {
		try {
			return (await services.getTaskListById(taskListId) as TaskListDTO);
		} catch (error) {
			return thunkAPI.rejectWithValue('Something went wrong');
		}
	}
);

export const saveTaskList = createAsyncThunk(
	'taskList/saveTaskList',
	async (taskList: TaskList, thunkAPI) => {
		try {
			return await services.saveTaskList(taskList);
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('Something went wrong');
		}
	}
);
	
