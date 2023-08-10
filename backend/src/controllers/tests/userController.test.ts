import request from 'supertest';
import { describe, expect, test } from 'vitest';

import app from '../../app';

const api = request(app);

describe('/user', () => {
	describe('GET /user', () => {
		test('Should return 200', async () => {
			const { body: userTokens } = await api.post('/api/v1/auth/login').send({
				email: 'demo@demo.com',
				password: '1234',
			});

			const { status, body } = await api
				.get('/api/v1/user')
				.set('Authorization', `Bearer ${userTokens.accessToken as string}`);

			expect(status).toBe(200);
			expect(body).toBeDefined();
			expect(body).toBeInstanceOf(Array);
         expect(body.at(0).roles).toBeInstanceOf(Array);
		});

      test('Should return 403 if user is not admin', async () => {
			const { body: userTokens } = await api.post('/api/v1/auth/login').send({
				email: 'demo2@demo.com',
				password: '1234',
			});

			const { status, body } = await api
				.get('/api/v1/user')
				.set('Authorization', `Bearer ${userTokens.accessToken as string}`);

			expect(status).toBe(403);
			expect(body.error).toBeDefined();
			expect(body.error).toBe('Forbidden');
		});

      test('Should return 401 if user is not logged in', async () => {
         const { status, body } = await api.get('/api/v1/user');

			expect(status).toBe(401);
			expect(body.error).toBeDefined();
			expect(body.error).toBe('No token was provided');
		});


	});
});
