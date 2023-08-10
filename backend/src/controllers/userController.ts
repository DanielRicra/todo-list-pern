import type { Request, Response, NextFunction } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { HTTP_STATUS } from '../utils/constants';
import prisma from '../libs/prisma';

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const users = await prisma.user.findMany({ include: { roles: true } });
		res.status(HTTP_STATUS.OK).json(users);
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { userId } = req.params;
		const user = await prisma.user.findUniqueOrThrow({
			where: { userId: Number(userId) },
			include: {
				roles: true,
				taskLists: {
					include: {
						tasks: true,
					},
				},
			},
		});
		res.status(HTTP_STATUS.OK).json(user);
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found' });
			}
		}
		next(error);
	}
};
