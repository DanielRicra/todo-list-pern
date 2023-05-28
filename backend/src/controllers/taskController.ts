import { Prisma, PrismaClient } from '@prisma/client';
import type { Request,  Response } from 'express';

const prisma = new PrismaClient();

export const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
	try {
		const tasks = await prisma.task.findMany({
         orderBy: {
            taskId: 'asc'
         }
      });
		res.status(200).json(tasks);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
		console.log('Unexpected error: ', error);
	}
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { taskId } = req.params;
		const existingTask = await prisma.task.findFirst({
			where: {
				taskId: Number(taskId)
			}
		});

		if (!existingTask) {
			res.status(404).json({ error: 'Task not found' });
			return;
		}

		res.status(200).json(existingTask);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
		console.log('Unexpected error: ', error);
	}
};

export const saveNewTask = async (req: Request, res: Response): Promise<void> => {
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
		if (error instanceof Error) {
			res.status(500).json({ error: error.message });
		}
		console.log('Unexpected error: ', error);
	}
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(404).json({ error: 'Task not found' });
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

export const deleteById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { taskId } = req.params;
		await prisma.task.delete({
			where: {
				taskId: Number(taskId),
			},
		});

		res.status(200).json({ message: 'Task deleted' });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(404).json({ error: 'Task not found' });
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