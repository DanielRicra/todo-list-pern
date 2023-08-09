import type { NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { HTTP_STATUS } from '../utils/constants';
import prisma from '../libs/prisma';
import { isEmailValid } from '../utils/validateData';
import {
	createRefreshToken,
	deleteRefreshTokenByToken,
	findRefreshTokenByToken,
} from '../service/refreshTokenService';
import { type UserForAccessToken } from '../types';

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

		const accessToken = generateJWT(user, process.env.ACCESS_TOKEN_SECRET!,'180s');
		const token = generateJWT(user, process.env.REFRESH_TOKEN_SECRET!);

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

		const accessToken = generateJWT(user, process.env.ACCESS_TOKEN_SECRET!, '180s');
		const token = generateJWT(user, process.env.REFRESH_TOKEN_SECRET!);

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

export const revalidateAccessToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token = req.body.token;

	if (!token) {
		res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Missing token' });
		return;
	}

	try {
		const existingRefreshToken = await findRefreshTokenByToken(token);

		const decodedToken = jwt.verify(
			existingRefreshToken.token,
			process.env.REFRESH_TOKEN_SECRET!
		) as UserForAccessToken;

		const user: UserForAccessToken = {
			email: decodedToken.email,
			name: decodedToken.name,
			userId: decodedToken.userId,
		};
		const accessToken = generateJWT(user, process.env.ACCESS_TOKEN_SECRET!,'180s');

		res.status(200).json({ accessToken });
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			res
				.status(HTTP_STATUS.UNAUTHORIZED)
				.json({ error: 'Unauthorized, invalid signature' });
			return;
		}
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res
					.status(HTTP_STATUS.NOT_FOUND)
					.json({ error: 'Refresh Token not found' });
				return;
			}
		}
		next(error);
	}
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Missing token' });
		return;
	}

	try {
		await deleteRefreshTokenByToken(token);

		res.sendStatus(204);
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				res
					.status(HTTP_STATUS.NOT_FOUND)
					.json({ error: 'Refresh Token not found' });
				return;
			}
		}

		next(error);
	}
};

function generateJWT(user: UserForAccessToken, secret: string, expiresIn?: string): string {
	return jwt.sign(
		user,
		secret,
		expiresIn ? { expiresIn } : undefined
	);
}
