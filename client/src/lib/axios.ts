import axios from 'axios';

const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const isDev = import.meta.env.DEV;

/**
 * API Axios instance to access server API routes.
 */
export const api = axios.create({
	baseURL: isLocal
		? 'http://localhost:3000/'
		: isDev
		? 'https://api.dev.skynetwork.app'
		: 'https://api.skynetwork.app',
});
