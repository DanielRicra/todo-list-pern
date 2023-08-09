import request from 'supertest';
import { describe, expect, test } from 'vitest';

import app from '../../app';

const api = request(app);

describe('/tasklist', () => {
	describe('GET /tasklist', () => {
		test('should return 200', async () => {
			const { body: userTokens } = await api.post('/api/v1/auth/login').send({
				email: 'demo@demo.com',
				password: '1234',
			});

			const { status, body } = await api
				.get('/api/v1/tasklist')
				.set('Authorization', `Bearer ${userTokens.accessToken as string}`);

			expect(status).toBe(200);
			expect(body).toBeDefined();
			expect(body).toBeInstanceOf(Array);
		});

		test('Should return 403 if user is not admin', async () => {
			const { body: userTokens } = await api.post('/api/v1/auth/login').send({
				email: 'demo2@demo.com',
				password: '1234',
			});

			const { status, body } = await api
				.get('/api/v1/tasklist')
				.set('Authorization', `Bearer ${userTokens.accessToken as string}`);

			expect(status).toBe(403);
			expect(body.error).toBeDefined();
			expect(body.error).toBe('Forbidden');
		});

		test('should return 400 if no token', async () => {
			const { status, body } = await api.get('/api/v1/tasklist');

			expect(status).toBe(400);
			expect(body.error).toBeDefined();
			expect(body.error).toBe('No token was provided');
		});

		test('should return 401 if token is invalid', async () => {
			const { status, body } = await api
				.get('/api/v1/tasklist')
				.set('Authorization', 'Bearer invalid');

			expect(status).toBe(401);
			expect(body.error).toBeDefined();
			expect(body.error).toBe('Unauthorized');
		});
	});
});
