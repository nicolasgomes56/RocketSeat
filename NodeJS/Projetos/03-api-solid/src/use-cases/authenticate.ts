import type { UsersRepository } from '@/repositories/users-repository';
import type { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthenticateUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUseCaseResponse {
	user: User;
}

export class AuthenticateUseCase {
	constructor(private readonly userRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await bcrypt.compare(
			password,
			user.password_hash,
		);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return {
			user,
		};
	}
}
