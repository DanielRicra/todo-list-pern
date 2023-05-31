import { Task, TaskDTO } from '../types';

export const convertTaskDTOToTask = (taskDTO: TaskDTO): Task => {
	return {
		taskId: taskDTO.taskId,
		title: taskDTO.title,
		description: taskDTO.description ?? undefined,
		dueDate: taskDTO.dueDate ? new Date(taskDTO.dueDate) : undefined,
		completedAt: taskDTO.completedAt ? new Date(taskDTO.completedAt) : undefined,
		taskListId: taskDTO.taskListId,
		createdAt: new Date(taskDTO.createdAt),
	};
};

export const convertTaskToTaskDTO = (task: Task): TaskDTO => {
	return {
		taskId: task.taskId,
		title: task.title,
		description: task.description || null,
		dueDate: task.dueDate ? task.dueDate.toISOString() : null,
		completedAt: task.completedAt ? task.completedAt.toISOString() : null,
		taskListId: task.taskListId,
		createdAt: task.createdAt.toISOString(),
	};
};
