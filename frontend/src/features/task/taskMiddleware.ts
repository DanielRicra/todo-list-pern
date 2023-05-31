import { createAsyncThunk } from '@reduxjs/toolkit';
import services from '../../services/taskService';
import taskListService from '../../services/taskListService';
import { TaskDTO, TaskListDTO } from '../../types';

export const fetchTasksByTaskListId = createAsyncThunk(
	'task/fetchTasksByTaskListId',
	async (taskListId: number, thunkAPI) => {
		try {
			return (await taskListService.getTaskListById(taskListId) as TaskListDTO);
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('Something went wrong');
		}
	}
);

export const saveTask = createAsyncThunk(
	'task/saveTask',
	async (task: TaskDTO, thunkAPI) => {
		try {
			return await services.saveTask(task);
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return thunkAPI.rejectWithValue('Something went wrong');
		}
	}
);

export const updateTask = createAsyncThunk(
   'task/updateTask',
   async (task: TaskDTO, thunkAPI) => {
      try {
         return await services.updateTask(task);
      } catch (error) {
         if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
         }
         return thunkAPI.rejectWithValue('Something went wrong');
      }
   }
);