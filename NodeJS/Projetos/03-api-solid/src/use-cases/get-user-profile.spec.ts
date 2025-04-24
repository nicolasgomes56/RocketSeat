import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { GetUserProfileUseCase } from './get-user-profile';

let userRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepository();
		sut = new GetUserProfileUseCase(userRepository);
	});

	it('should be able to get user profile', async () => {
		const createadUser = await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await bcrypt.hash('123456', 6),
		});

		const { user } = await sut.execute({
			userId: createadUser.id,
		});

		expect(user.id).toEqual(expect.any(String));
		expect(user.name).toEqual('John Doe');
	});

	it('should be able to get user profile with wrong id', async () => {
		await expect(
			sut.execute({
				userId: 'non-existing-id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
