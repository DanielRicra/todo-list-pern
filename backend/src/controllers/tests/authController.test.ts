import request from 'supertest';
import { describe, expect, test } from 'vitest';

import app from '../../app';
import prisma from '../../libs/prisma';

const api = request(app);

describe('/auth', async () => {
	describe('POST /auth/signup', () => {
		test('Should return a 201 on successful signup', async () => {
			const { status, body } = await api
				.post('/api/v1/auth/signup')
				.send({ email: 'test2@email.com', password: 'testPassword', name: 'Test' });

			const newUser = await prisma.user.findFirst();

			expect(status).toBe(201);
			expect(newUser).not.toBeNull();
			expect(body).toStrictEqual({
				accessToken: expect.any(String),
				refreshToken: expect.any(String),
			});

			await prisma.user.delete({ where: { email: 'test2@email.com' } });
		});

		describe('Should return 409 on duplicate email', () => {
			test('Should return 409 on duplicate email', async () => {
				const { status, body } = await api
					.post('/api/v1/auth/signup')
					.send({ email: 'test@email.com', password: 'testPassword', name: 'Test' });

				expect(status).toBe(409);
				expect(body.error).toBe('Email already taken');
			});
		});
	});

	describe('POST /auth/login', () => {
		test('should return a 200 on successful login', async () => {
			const { status, body } = await api.post('/api/v1/auth/login').send({
				email: 'demo@demo.com',
				password: '1234',
			});

			expect(status).toBe(200);
			expect(body).toStrictEqual({
				accessToken: expect.any(String),
				refreshToken: expect.any(String),
			});
		});

		test('should return a 400 on invalid password', async () => {
			const { status, body } = await api
				.post('/api/v1/auth/login')
				.send({ email: 'demo@demo.com', password: 'fakePassword' });

			expect(status).toBe(400);
			expect(body.error).toBe('Invalid credentials');
		});

		test('should return a 404 on invalid email', async () => {
			const { status, body } = await api
				.post('/api/v1/auth/login')
				.send({ email: 'XXXXXXXXXXXXXX', password: 'fakePassword' });

			expect(status).toBe(404);
			expect(body.error).toBe('User not found');
		});
	});

	describe('POST /auth/token', () => {
		test('should return a 200 on successful token refresh', async () => {
			const { body: userTokens } = await api.post('/api/v1/auth/login').send({
				email: 'demo@demo.com',
				password: '1234',
			});

			const { status, body } = await api
				.post('/api/v1/auth/token')
				.send({ token: userTokens.refreshToken });

			expect(status).toBe(200);
			expect(body).toStrictEqual({ accessToken: expect.any(String) });
			expect(body.accessToken).not.toBe(userTokens.accessToken);
		});

		test('should return a 404 on not found token', async () => {
			const { status, body } = await api
				.post('/api/v1/auth/token')
				.send({ token: 'fakeToken' });

			expect(status).toBe(404);
			expect(body.error).toBe('Refresh Token not found');
		});

		test('should return a 400 on missing token', async () => {
			const { status, body } = await api.post('/api/v1/auth/token');

			expect(status).toBe(400);
			expect(body.error).toBe('Missing token');
		});
	});
});
