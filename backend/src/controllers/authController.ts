import type { NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { HTTP_STATUS } from '../utils/constants';
import prisma from '../libs/prisma';
import { isEmailValid } from '../utils/validateData';
import { createRefreshToken } from '../service/refreshTokenService';

interface UserForAccessToken {
	userId: number;
	email: string;
	name: string;
}

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Missing credentials' });
		return;
	}

	try {
		const existingUser = await prisma.user.findUniqueOrThrow({
			where: { email },
		});

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid credentials' });
			return;
		}

		const user: UserForAccessToken = {
			userId: existingUser.userId,
			email: existingUser.email,
			name: existingUser.name,
		};

		const accessToken = generateJWT(user, '180s');
		const token = generateJWT(user);

		const refreshToken = await createRefreshToken({
			token,
			userId: existingUser.userId,
		});

		res.status(200).json({
			accessToken,
			refreshToken: refreshToken.token,
		});
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'User not found' });
				return;
			}
		}
		next(error);
	}
};

export const signUp = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Missing credentials' });
		return;
	}

	if (!isEmailValid(email)) {
		res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid email' });
		return;
	}

	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		const user: UserForAccessToken = {
			email,
			name,
			userId: newUser.userId,
		};

		const accessToken = generateJWT(user, '180s');
		const token = generateJWT(user);

		const refreshToken = await createRefreshToken({
			token,
			userId: newUser.userId,
		});

		res.status(HTTP_STATUS.CREATED).json({
			accessToken,
			refreshToken: refreshToken.token,
		});
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				res.status(HTTP_STATUS.CONFLICT).json({ error: 'Email already taken' });
				return;
			}
		}
		next(error);
	}
};

function generateJWT(user: UserForAccessToken, expiresIn?: string): string {
	return jwt.sign(
		user,
		process.env.ACCESS_TOKEN_SECRET as string,
		expiresIn ? { expiresIn } : undefined
	);
}
