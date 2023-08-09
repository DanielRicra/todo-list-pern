import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { NextFunction, Request, Response } from 'express';

import prisma from '../libs/prisma';

export const getAllTasks = async (
	_req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const tasks = await prisma.task.findMany({
			orderBy: {
				taskId: 'asc',
			},
		});
		res.status(200).json(tasks);
	} catch (error) {
		next(error);
	}
};

export const getTaskById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { taskId } = req.params;
		const existingTask = await prisma.task.findFirst({
			where: {
				taskId: Number(taskId),
			},
		});

		if (!existingTask) {
			res.status(404).json({ error: 'Task not found' });
			return;
		}

		res.status(200).json(existingTask);
	} catch (error) {
		next(error);
	}
};

export const getTasksByTaskListId = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { taskListId } = req.params;
		const tasks = await prisma.task.findMany({
			where: {
				taskListId: Number(taskListId),
			},
		});

		res.status(200).json(tasks);
	} catch (error) {
		next(error);
	}
};

export const saveNewTask = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { title, taskListId, description, dueDate } = req.body;
		const newTask = await prisma.task.create({
			data: {
				title,
				taskListId,
				description,
				dueDate,
			},
		});
		res.status(201).json(newTask);
	} catch (error) {
		next(error);
	}
};

export const updateTask = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { taskId } = req.params;
		const { title, taskListId, description, dueDate, completedAt } = req.body;

		const updatedTask = await prisma.task.update({
			where: {
				taskId: Number(taskId),
			},
			data: {
				title,
				taskListId,
				description,
				dueDate,
				completedAt,
			},
		});
		res.status(200).json(updatedTask);
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(404).json({ error: 'Task not found' });
				return;
			}
		}

		next(error);
	}
};

export const deleteById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { taskId } = req.params;
		await prisma.task.delete({
			where: {
				taskId: Number(taskId),
			},
		});

		res.status(200).json({ message: 'Task deleted' });
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(404).json({ error: 'Task not found' });
				return;
			}
		}

		next(error);
	}
};
