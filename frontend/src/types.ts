export type Task = {
	taskId?: number;
	title: string;
	description?: string;
	dueDate?: Date;
	completedAt?: Date;
	taskListId: number;
	createdAt: Date;
};

export type TaskDTO = {
	taskId?: number;
	title: string;
	description: string | null;
	dueDate: string | null;
	completedAt: string | null;
	taskListId: number;
	createdAt: string;
};

export interface TaskList {
	name: string;
	userId: number;
};

export interface TaskListWithId extends TaskList {
	taskListId: number;
}

export type TaskListDTO = {
	taskListId: number;
	name: string;
	userId: number;
	tasks: TaskDTO[];
};

export type SVGIconProps = {
	stroke?: string;
	strokeWidth?: string;
	className?: string;
	fill?: string;
};

export type TaskCardProps = {
	task: TaskDTO;
	isDropdownOpen: boolean;
	toggleShowDropdown: () => void;
};

export interface TaskState {
	value: TaskListDTO;
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
	error: string;
}

export interface TaskListState {
	value: TaskList[];
	currentTaskList: TaskListDTO;
	status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
	error: string;
}

export interface User {
	userId: number;
	email: string;
	name: string;
}

export type UserWithTokens = {
	accessToken: string;
	refreshToken: string;
} & User;

export interface UserState {
	value: UserWithTokens;
}
