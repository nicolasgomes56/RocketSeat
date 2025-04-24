import { app } from './app';
import { env } from './env';

app
	.listen({
		host: '0.0.0.0',
		port: env.PORT,
	})
	.then((address) => {
		console.log(`Server listening on ${address}`);
	})
	.catch((error) => {
		console.error(`Error starting server: ${error}`);
		process.exit(1);
	});
