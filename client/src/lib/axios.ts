import axios, { AxiosError, HttpStatusCode } from 'axios';
import { getServerHost } from '../environment';

/**
 * API Axios instance to access server API routes.
 *
 * This automatically handles the authorization header
 * and URL host.
 */
export const api = axios.create({
	baseURL: getServerHost(),
});

api.interceptors.response.use(
	(res) => {
		if (res.status === HttpStatusCode.Unauthorized) location.assign('/login');
		return res;
	},
	(err) => {
		if (!(err instanceof AxiosError)) return Promise.reject(err);
		if (err.response?.status === HttpStatusCode.Unauthorized && location.pathname !== '/login')
			// 	location.assign('/login');
			console.log(err);
		return Promise.reject(err);
	},
);
