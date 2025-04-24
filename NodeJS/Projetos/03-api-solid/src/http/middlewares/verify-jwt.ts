import type { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
	try {
		await request.jwtVerify();
	} catch (error) {
		reply.status(401).send({
			error: 'Unauthorized',
			message: 'Invalid or expired token',
		});
	}
}
