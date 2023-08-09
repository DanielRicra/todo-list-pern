import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { HTTP_STATUS } from '../utils/constants';
import prisma from '../libs/prisma';
import type { UserForAccessToken } from '../types';

interface AuthRequest extends Request {
	user?: UserForAccessToken;
}

export const verifyToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): void => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'No token was provided' });
		return;
	}

	try {
		const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
		req.user = decodedToken as UserForAccessToken;

		next();
	} catch (error) {
		res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Unauthorized' });
	}
};

export const verifyAdmin = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const userId = req.user?.userId;

	try {
		const user = await prisma.user.findFirst({
			where: {
				userId,
			},
			include: {
				roles: true,
			},
		});

		if (!user) {
			res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
			return;
		}

		if (!user.roles.some((role) => role.name === 'ADMIN')) {
			res.status(HTTP_STATUS.FORBIDDEN).json({ error: 'Forbidden' });
			return;
		}
		next();
	} catch (error) {
		res
			.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
			.json({ error: 'Internal server error' });
	}
};
