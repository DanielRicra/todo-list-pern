import type { RefreshToken } from '@prisma/client';

import prisma from '../libs/prisma';

interface RefreshTokenDTO {
	token: string;
	userId: number;
}

export const createRefreshToken = async (
	refreshToken: RefreshTokenDTO
): Promise<RefreshToken> => {
	return await prisma.refreshToken.create({
		data: refreshToken,
	});
};

export const findRefreshTokenByToken = async (
	token: string
): Promise<RefreshToken | null> => {
	return await prisma.refreshToken.findFirst({
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
