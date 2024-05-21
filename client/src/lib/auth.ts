import { HttpStatusCode } from 'axios';
import { api } from './axios';

/**
 * Utility namespace for JWT token authorization.
 */
export namespace Auth {
	const LS_KEY = 'jwt';

	/**
	 * Formats the given token into an authorization header value.
	 *
	 * @param token the JWT token to format
	 * @returns the prefixed token, for an authorization header
	 */
	export function formatToken(token: string) {
		return `Bearer ${token}`;
	}

	/**
	 * Saves the token into the API axios instance and local storage.
	 *
	 * @param token the JWT token to save
	 */
	export function saveToken(token: string) {
		api.defaults.headers.common.Authorization = formatToken(token);
		localStorage.setItem(LS_KEY, token);
	}

	/**
	 * Removes the current authorization header and removes the
	 * token from local storage.
	 */
	export function loseToken() {
		api.defaults.headers.common.Authorization = '';
		localStorage.removeItem(LS_KEY);
	}

	/**
	 * Retrieves the current token from local storage, if it exists.
	 *
	 * @returns the token, if one exists
	 */
	export function getToken() {
		return localStorage.getItem(LS_KEY);
	}

	/**
	 * Retrieves the token from local storage, and then sets
	 * the retrieved token.
	 *
	 * @returns whether any token was set
	 */
	export function resaveToken() {
		const token = getToken();
		if (!token) return false;

		saveToken(token);
		return true;
	}

	/**
	 * Queries the API for a new token, with the given search paramters.
	 * This can be used to obtain a token when logging in from a third party
	 * authentication provider.
	 *
	 * @param params the search parameters to query with (to include an authorization code for example)
	 */
	export async function fetchToken(params: URLSearchParams) {
		try {
			params.set('token', 'refresh');
			const res = await api.get('/user/login', { params });
			const token = res.data?.value;
			if (typeof token === 'string') return token;
		} catch {}
	}

	/**
	 * Returns whether there is an active and valid token
	 * currently set.
	 */
	export async function isAuthorized() {
		try {
			const res = await api.get('/user/login');
			return res.status === HttpStatusCode.Ok;
		} catch {
			return false;
		}
	}
}
