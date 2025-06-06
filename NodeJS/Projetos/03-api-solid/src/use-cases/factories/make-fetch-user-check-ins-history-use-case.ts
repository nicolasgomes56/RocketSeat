import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase() {
	const checkinsRepository = new PrismaCheckInsRepository();
	const useCase = new FetchUserCheckInsHistoryUseCase(checkinsRepository);

	return useCase;
}
