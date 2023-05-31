import { TaskList } from '../types';

const BASE_URL = 'http://localhost:3001/api/v1';

const getTaskListsByUserId = async (userId: number) => {
	try {
		const response = await fetch(`${BASE_URL}/taskList/user/${userId}`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error('Something went wrong');
	}
};

const getTaskListById = async (taskListId: number) => {
	try {
		const response = await fetch(`${BASE_URL}/taskList/${taskListId}`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		
		throw new Error('Something went wrong');
	}
};

const saveTaskList = async (taskList: TaskList) => {
	try {
		const response = await fetch(`${BASE_URL}/taskList`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(taskList),
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}
		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
};

export default {
	getTaskListsByUserId,
	saveTaskList,
	getTaskListById
};
