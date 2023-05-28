import { Task, TaskDTO } from '../types';

export const convertTaskDTOToTask = (taskDTO: TaskDTO): Task => {
	return {
		id: taskDTO.id,
		title: taskDTO.title,
		description: taskDTO.description,
		dueDate: taskDTO.dueDate ? new Date(taskDTO.dueDate) : undefined,
		completedAt: taskDTO.completedAt ? new Date(taskDTO.completedAt) : undefined,
		taskListId: taskDTO.taskListId,
		createdAt: new Date(taskDTO.createdAt),
		updatedAt: taskDTO.updatedAt ? new Date(taskDTO.updatedAt) : undefined,
	};
};

export const convertTaskToTaskDTO = (task: Task): TaskDTO => {
	return {
		id: task.id,
		title: task.title,
		description: task.description,
		dueDate: task.dueDate ? task.dueDate.toISOString() : undefined,
		completedAt: task.completedAt ? task.completedAt.toISOString() : undefined,
		taskListId: task.taskListId,
		createdAt: task.createdAt.toISOString(),
		updatedAt: task.updatedAt ? task.updatedAt.toISOString() : undefined,
	};
};
