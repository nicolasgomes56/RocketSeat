import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { MaxDistanceError } from './errors/max-distance-error';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check In Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		gymsRepository = new InMemoryGymsRepository();
		sut = new CheckInUseCase(checkInsRepository, gymsRepository);

		await gymsRepository.create({
			id: 'gym-01',
			title: 'Academia 01',
			description: '',
			phone: '',
			latitude: -3.7694448,
			longitude: -38.6549258,
		});

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -3.7694448,
			userLongitude: -38.6549258,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2024, 9, 30, 9, 0, 0));
		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -3.7694448,
			userLongitude: -38.6549258,
		});

		await expect(() =>
			sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: -3.7694448,
				userLongitude: -38.6549258,
			}),
		).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
	});

	it('should not be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2024, 9, 30, 9, 0, 0));

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -3.7694448,
			userLongitude: -38.6549258,
		});

		vi.setSystemTime(new Date(2024, 9, 31, 9, 0, 0));

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -3.7694448,
			userLongitude: -38.6549258,
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in on distant gym', async () => {
		gymsRepository.items.push({
			id: 'gym-02',
			title: 'Academia 02',
			description: '',
			phone: '',
			latitude: new Decimal(-3.7639849),
			longitude: new Decimal(-38.6542499),
		});

		await expect(
			sut.execute({
				gymId: 'gym-02',
				userId: 'user-01',
				userLatitude: -3.7694448,
				userLongitude: -38.6549258,
			}),
		).rejects.toBeInstanceOf(MaxDistanceError);
	});
});
