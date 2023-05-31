import { TaskDTO } from '../types';

const BASE_URL = 'http://localhost:3001/api/v1';

const getTasksByTaskListId = async (taskListId: number) => {
	try {
		const response = await fetch(`${BASE_URL}/task/taskList/${taskListId}`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error);
		}
		
		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('Something went wrong');
	}
};

const updateTask = async (task: TaskDTO) => {
	try {
		const response = await fetch(`${BASE_URL}/task/${task.taskId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error);
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('Something went wrong');
	}
};

const saveTask = async (task: TaskDTO) => {
	try {
		const response = await fetch(`${BASE_URL}/task`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error);
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('Something went wrong');
	}
};

export default { getTasksByTaskListId, updateTask, saveTask };
