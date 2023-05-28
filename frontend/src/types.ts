export type Task = {
	id: number;
	title: string;
	description?: string;
	dueDate?: Date;
	completedAt?: Date;
	taskListId: number;
	createdAt: Date;
	updatedAt?: Date;
};

export type TaskDTO  = {
	id: number;
	title: string;
	description?: string;
	dueDate?: string;
	completedAt?: string;
	taskListId: number;
	createdAt: string;
	updatedAt?: string;
}

export type TaskList = {
	taskListId: number;
	name: string;
	userId: number;
}

export type TaskListDTO = {
	name: string;
	userId: number;
}

export type SVGIconProps = {
	stroke?: string;
   strokeWidth?: string;
   className?: string;
	fill?: string;
}

export type SetTaskPayload = {
	tasks: TaskDTO[];
	taskListId: number;
}

export type	TaskProps = {
	task: TaskDTO;
}

export interface TaskState {
	value: TaskDTO[];
	taskListId: number;
	status: 'idle' | 'loading' | 'failed';
}


export interface TaskListState {
	value: TaskList[];
	status: 'idle' | 'loading' | 'failed';
}
	