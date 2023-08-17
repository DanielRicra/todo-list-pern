import type { NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { HTTP_STATUS } from '../utils/constants';
import prisma from '../libs/prisma';

export const getAllTaskLists = async (
	_req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const taskLists = await prisma.taskList.findMany();
		res.status(200).json(taskLists);
	} catch (error) {
		next(error);
	}
};

export const getTaskListById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { taskListId } = req.params;
	try {
		const taskList = await prisma.taskList.findUnique({
			where: {
				taskListId: Number(taskListId),
			},
			include: {
				tasks: true,
			},
		});

		if (!taskList) {
			res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Task list not found' });
			return;
		}

		res.status(HTTP_STATUS.OK).json(taskList);
	} catch (error) {
		next(error);
	}
};

export const getTaskListsByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { userId } = req.params;
	try {
		const taskLists = await prisma.taskList.findMany({
			where: {
				userId: Number(userId),
			},
			include: {
				tasks: true,
			},
		});
		res.status(HTTP_STATUS.OK).json(taskLists);
	} catch (error) {
		next(error);
	}
};

export const saveNewTaskList = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { name, userId } = req.body;

		const taskList = await prisma.taskList.create({
			data: {
				name,
				userId,
			},
		});

		res.status(HTTP_STATUS.CREATED).json(taskList);
	} catch (error) {
		next(error);
	}
};

export const deleteTaskListById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { taskListId } = req.params;

		await prisma.taskList.delete({
			where: {
				taskListId: Number(taskListId),
			},
		});

		res.status(200).json({ message: 'Task list deleted' });
	} catch (error) {
		next(error);
	}
};

export const updateTaskList = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { taskListId } = req.params;
		const { name } = req.body;

		const updatedTask = await prisma.taskList.update({
			where: {
				taskListId: Number(taskListId),
			},
			data: {
				name,
			},
		});
		res.status(HTTP_STATUS.OK).json(updatedTask);
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'TaskList not found' });
				return;
			}
		}

		next(error);
	}
};
