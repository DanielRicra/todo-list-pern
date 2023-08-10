import { test, expect, vi, describe } from 'vitest';

import {
	createRefreshToken,
	findRefreshTokenByToken,
	deleteRefreshTokenByToken,
} from '../refreshTokenService';
import prisma from '../../libs/__mocks__/prisma';

vi.mock('../../libs/prisma');

describe('RefreshToken service', () => {
	test('createRefreshToken should return a generated RefreshToken', async () => {
		const refreshTokenData = {
			token: 'a token',
			userId: 1,
			createdAt: new Date(),
		};

		prisma.refreshToken.upsert.mockResolvedValue({
			...refreshTokenData,
			refreshTokenId: 1,
		});
		const refreshToken = await createRefreshToken(refreshTokenData);

		expect(refreshToken).toStrictEqual({
			...refreshTokenData,
			refreshTokenId: 1,
		});
	});

	describe('Function findRefreshTokenByToken', () => {
		test('findRefreshTokenByToken should return a RefreshToken if it exists', async () => {
			const mockRefreshToken = {
				token: 'a token',
				userId: 1,
				createdAt: new Date('2023-08-07T14:11:33.262Z'),
				refreshTokenId: 1,
			};
			prisma.refreshToken.findUniqueOrThrow.mockResolvedValue(mockRefreshToken);

			const refreshToken = await findRefreshTokenByToken('a token');

			expect(refreshToken).toStrictEqual(mockRefreshToken);
			expect(refreshToken?.token).equals(mockRefreshToken.token);
		});

		test('findRefreshTokenByToken should throw if refresh token doesn\'t exist', async () => {
			prisma.refreshToken.findUniqueOrThrow.mockImplementation(() => {
				throw new Error('Not found');
			});

			expect(findRefreshTokenByToken('a token')).rejects.toThrow();
		});
	});

	describe('Function deleteRefreshTokenByToken', () => {
		test('deleteRefreshTokenByToken should return a RefreshToken if it deletes a token', async () => {
			const mockRefreshToken = {
				token: 'a token',
				userId: 1,
				createdAt: new Date(),
				refreshTokenId: 1,
			};
			prisma.refreshToken.delete.mockResolvedValue(mockRefreshToken);

			const refreshToken = await deleteRefreshTokenByToken('a token');

			expect(refreshToken).toStrictEqual(mockRefreshToken);
			expect(refreshToken?.token).equals(mockRefreshToken.token);
		});

		test('deleteRefreshTokenByToken should throw an error if it does not found the token', async () => {
			prisma.refreshToken.delete.mockImplementation(() => {
				throw new Error('Not found');
			});

			await expect(deleteRefreshTokenByToken('a token')).rejects.toThrow();
			await expect(deleteRefreshTokenByToken('a token')).rejects.toThrowError(
				'Not found'
			);
			expect(prisma.refreshToken.delete).toHaveBeenCalled();
			expect(prisma.refreshToken.delete).toHaveBeenCalledWith({
				where: { token: 'a token' },
			});
		});
	});
});
