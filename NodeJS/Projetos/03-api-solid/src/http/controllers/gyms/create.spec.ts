import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Gym Controller', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to get create a gym', async () => {
		const { token } = await createAndAuthenticateUser(app, true);

		const response = await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'JavaScript Gym',
				description: 'Some description',
				phone: '1199999999',
				latitude: -3.7639849,
				longitude: -38.6542499,
			});

		expect(response.statusCode).toEqual(201);
	});
});
