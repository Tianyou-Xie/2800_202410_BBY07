import axios, { AxiosError, HttpStatusCode } from 'axios';

const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const isDev = import.meta.env.MODE === 'development';

/**
 * API Axios instance to access server API routes.
 *
 * This automatically handles the authorization header
 * and URL host.
 */
export const api = axios.create({
	baseURL: isLocal
		? 'http://localhost:3000/'
		: isDev
		? 'https://api.dev.skynetwork.app'
		: 'https://api.skynetwork.app',
});

api.interceptors.response.use(
	(res) => {
		if (res.status === HttpStatusCode.Unauthorized) location.assign('/login');
		return res;
	},
	(err) => {
		if (!(err instanceof AxiosError)) return Promise.reject(err);
		if (err.response?.status === HttpStatusCode.Unauthorized) location.assign('/login');
	},
);
