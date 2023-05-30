import { Prisma, PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/constants';

const prisma = new PrismaClient();

export const getAllTaskLists = async (
	_req: Request,
	res: Response
): Promise<void> => {
	try {
		const taskLists = await prisma.taskList.findMany();
		res.status(200).json(taskLists);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};

export const getTaskListById = async (
	req: Request,
	res: Response
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
		if (error instanceof Error) {
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
			return;
		}
		res
			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
			.json({ error: 'Something went wrong' });
	}
};

export const getTaskListsByUserId = async (
	req: Request,
	res: Response
): Promise<void> => {
	const { userId } = req.params;
	try {
		const taskLists = await prisma.taskList.findMany({
			where: {
				userId: Number(userId),
			},
		});
		res.status(HTTP_STATUS.OK).json(taskLists);
	} catch (error) {
		if (error instanceof Error) {
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
		}
	}
};

export const saveNewTaskList = async (
	req: Request,
	res: Response
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
		if (error instanceof Error) {
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
			return;
		}
		res
			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
			.json({ error: 'Something went wrong' });
	}
};

export const deleteTaskListById = async (
	req: Request,
	res: Response
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
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};

export const updateTaskList = async (
	req: Request,
	res: Response
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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'TaskList not found' });
				return;
			}
		}

		if (error instanceof Error) {
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: error.message });
			return;
		}

		res
			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
			.json({ error: 'Unexpected error' });
	}
};
