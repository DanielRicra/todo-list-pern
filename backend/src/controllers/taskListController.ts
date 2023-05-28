import { Prisma, PrismaClient } from '@prisma/client';
import type { Request,  Response } from 'express';

const prisma = new PrismaClient();

export const getAllTaskLists = async (_req: Request, res: Response): Promise<void> => {
	try {
		const taskLists = await prisma.taskList.findMany();
		res.status(200).json(taskLists);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};

export const saveNewTaskList = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, userId } = req.body;
		
		const taskList = await prisma.taskList.create({
			data: {
				name,
				userId
			}
		});

		res.status(201).json(taskList);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
			return;
		}
		res.status(500).json({ error: 'Something went wrong' });
	}
};

export const deleteTaskListById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { taskListId } = req.params;
		
		await prisma.taskList.delete({
			where: {
				taskListId: Number(taskListId)
			}
		});

		res.status(200).json({ message: 'Task list deleted' });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
	}
};

export const updateTaskList = async (req: Request, res: Response): Promise<void> => {
	try {
		const { taskListId } = req.params;
		const { name } = req.body;

		const updatedTask = await prisma.taskList.update({
			where: {
				taskListId: Number(taskListId),
			},
			data: {
				name
			},
		});
		res.status(200).json(updatedTask);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(404).json({ error: 'TaskList not found' });
            return;
			}
		} 
      
      if (error instanceof Error) {
			res.status(500).json({ error: error.message });
         return;
		}

      res.status(500).json({ error: 'Unexpected error' });
	}
};