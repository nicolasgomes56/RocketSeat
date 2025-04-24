import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Nearby Gyms Controller', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to list nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app, true);

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'JavaScript Gym',
				description: 'Some description',
				phone: '1199999999',
				latitude: -3.7639849,
				longitude: -38.6542499,
			});

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Typescript Gym',
				description: 'Some description',
				phone: '1199999999',
				latitude: -3.79088,
				longitude: -38.4866815,
			});

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -3.7639849,
        longitude: -38.6542499,
			})
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				title: 'JavaScript Gym',
			}),
		]);
	});
});
