import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FetchNearbyUseCase } from '../fetch-nearby-gyms';

export function makeFetchNearbyGymsUseCase() {
	const gymsRepository = new PrismaGymsRepository();
	const useCase = new FetchNearbyUseCase(gymsRepository);

	return useCase;
}
