import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environmentMatchGlobs: [
			['src/http/controllers/**', 'src/vitest-environments/prisma.ts'],
		],
		dir: 'src',
	},
});
