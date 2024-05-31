/**
 * Configuration file for Vite build tool.
 * Defines plugins, CSS options, and server configuration.
 * Loads environment variables from .env file using dotenv.
 * @returns {import('vite').UserConfig}
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    
    /**
     * Plugins used by Vite during the build process.
     * Configures the react plugin for handling React JSX.
     */
	plugins: [react()],

    /**
     * CSS configuration options.
     * Enables CSS modules and sets localsConvention to 'camelCaseOnly'.
     */
	css: { modules: { localsConvention: 'camelCaseOnly' } },

    /**
     * Server configuration options.
     * Sets the port from environment variable VITE_PORT.
     */
	server: {
		port: parseInt(process.env.VITE_PORT!),
	},
});
