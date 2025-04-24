import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { FetchNearbyUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
	beforeEach(async () => {
		gymsRepository = new InMemoryGymsRepository();
		sut = new FetchNearbyUseCase(gymsRepository);
	});

	it('should be able to fetch nearby gyms', async () => {
		await gymsRepository.create({
			title: 'Near Gym',
			description: null,
			phone: null,
			latitude: -3.7639849,
			longitude: -38.6542499,
		});

		await gymsRepository.create({
			title: 'Far Gym',
			description: null,
			phone: null,
			latitude: -3.79088,
			longitude: -38.4866815,
		});

		const { gyms } = await sut.execute({
			userLatitude: -3.7694448,
			userLongitude: -38.6549258,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
	});
});
