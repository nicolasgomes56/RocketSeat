import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Check-in Controller', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to get create a check-in', async () => {
		const { token } = await createAndAuthenticateUser(app);

		const gym = await prisma.gym.create({
			data: {
				title: 'JavaScript Gym',
				latitude: -3.7639849,
				longitude: -38.6542499,
			},
		});

		const response = await request(app.server)
			.post(`/gyms/${gym.id}/check-ins`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: -3.7639849,
				longitude: -38.6542499,
			});

		expect(response.statusCode).toEqual(201);
	});
});
