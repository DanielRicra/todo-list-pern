import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/constants';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const existingUser = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (!existingUser) {
			res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
			return;
		}

		if (password !== existingUser.password) {
			res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid credentials' });
         return;
		}

		res
			.status(200)
			.json({
				email: existingUser.email,
				userId: existingUser.userId,
				name: existingUser.name,
			});
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' });
	}
};
