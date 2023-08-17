import {
	type BaseQueryFn,
	createApi,
	fetchBaseQuery,
	type FetchArgs,
	type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { RootState } from '@/app/store';
import { API_BASE_URL } from '@/config';
import { clearUser, refreshToken } from '@/features/user/userSlice';
import { TaskDTO, TaskList, TaskListDTO, TaskListWithId } from '@/types';

const baseQuery = fetchBaseQuery({
	baseUrl: API_BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).user.value.accessToken;
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const authTokenQuery = (method: 'POST' | 'DELETE') =>
	fetchBaseQuery({
		baseUrl: API_BASE_URL,
		method: method,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).user.value.refreshToken;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	});

export const baseQueryWithReAuth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error?.status === 401) {
		const fetchQuery = authTokenQuery('POST');
		const refreshResult = await fetchQuery('auth/token', api, extraOptions);

		if (refreshResult.data) {
			api.dispatch(
				refreshToken(
					(refreshResult.data as { accessToken: string }).accessToken
				)
			);

			result = await baseQuery(args, api, extraOptions);
		} else {
			result = await authTokenQuery('DELETE')(
				'auth/token',
				api,
				extraOptions
			);
			api.dispatch(clearUser());
		}
	}

	return result;
};

export const taskListApi = createApi({
	reducerPath: 'taskListApi',
	baseQuery: baseQueryWithReAuth,
	tagTypes: ['TaskLists'],
	endpoints: (builder) => ({
		getTaskListsByUserId: builder.query<TaskListWithId[], number>({
			query: (userId) => `taskList/user/${userId}`,
			providesTags: ['TaskLists'],
		}),
		getTaskListById: builder.query<TaskListDTO, string>({
			query: (id) => `taskList/${id}`,
			providesTags: (_result, _error, id) => [{ type: 'TaskLists', id }],
		}),
		addTaskList: builder.mutation<TaskListWithId, TaskList>({
			query: (body) => ({
				url: 'taskList',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['TaskLists'],
		}),
		updateTaskList: builder.mutation<TaskListWithId, Partial<TaskListWithId>>(
			{
				query: ({ taskListId, name }) => ({
					url: `taskList/${taskListId}`,
					method: 'PUT',
					body: { name },
				}),
				invalidatesTags: ['TaskLists'],
			}
		),
		deleteTaskList: builder.mutation<
			{ success: boolean; id: number },
			number
		>({
			query: (id) => ({
				url: `taskList/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['TaskLists'],
		}),
		addTaskToTaskList: builder.mutation<TaskDTO, Partial<TaskDTO>>({
			query: (task) => ({
				url: 'task',
				method: 'POST',
				body: task,
			}),
			invalidatesTags: (_result, _error, { taskListId }) => [
				{ type: 'TaskLists', id: taskListId },
			],
		}),
		updateTaskFromTaskList: builder.mutation<TaskDTO, TaskDTO>({
			query: (task) => ({
				url: `task/${task.taskId}`,
				method: 'PUT',
				body: task,
			}),
			invalidatesTags: (_result, _error, { taskListId }) => [
				{ type: 'TaskLists', id: taskListId },
			],
		}),
	}),
});

export const {
	useGetTaskListsByUserIdQuery,
	useGetTaskListByIdQuery,
	useAddTaskListMutation,
	useUpdateTaskListMutation,
	useDeleteTaskListMutation,
	useAddTaskToTaskListMutation,
	useUpdateTaskFromTaskListMutation,
} = taskListApi;
