import type { RefreshToken } from '@prisma/client';

import prisma from '../libs/prisma';

interface RefreshTokenDTO {
	token: string;
	userId: number;
}

export const createRefreshToken = async (
	refreshToken: RefreshTokenDTO
): Promise<RefreshToken> => {
	return await prisma.refreshToken.upsert({
		where: {
			userId: refreshToken.userId,
		},
		update: { token: refreshToken.token },
		create: {
			token: refreshToken.token,
			userId: refreshToken.userId,
		},
	});
};

export const findRefreshTokenByToken = async (
	token: string
): Promise<RefreshToken> => {
	return await prisma.refreshToken.findUniqueOrThrow({
		where: {
			token,
		},
	});
};

export const deleteRefreshTokenByToken = async (
	token: string
): Promise<RefreshToken> => {
	return await prisma.refreshToken.delete({
		where: {
			token,
		},
	});
};
