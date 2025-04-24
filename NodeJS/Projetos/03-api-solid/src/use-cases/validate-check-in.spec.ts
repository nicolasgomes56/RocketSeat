import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { ValidateCheckInUseCase } from './validate-check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe('Validade Check-in Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository();
		sut = new ValidateCheckInUseCase(checkInsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to validate the check-in', async () => {
		const createadCheckIn = await checkInsRepository.create({
			user_id: 'user-01',
			gym_id: 'gym-01',
		});

		const { checkIn } = await sut.execute({
			checkInId: createadCheckIn.id,
		});

		expect(checkIn.validated_at).toEqual(expect.any(Date));
		expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
	});

	it('should not be able to validate an inexistent check-in', async () => {
		await expect(() =>
			sut.execute({
				checkInId: 'inexistent-check-in-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
		vi.setSystemTime(new Date(2024, 10, 6, 18, 30));

		const createadCheckIn = await checkInsRepository.create({
			user_id: 'user-01',
			gym_id: 'gym-01',
		});

		const twentyOneMinutesInMs = 21 * 60 * 1000;

		vi.advanceTimersByTime(twentyOneMinutesInMs);

		await expect(() =>
			sut.execute({
				checkInId: createadCheckIn.id,
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
