import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [react()],
	css: { modules: { localsConvention: 'camelCaseOnly' } },
	server: {
		port: parseInt(process.env.PORT!),
	},
});
