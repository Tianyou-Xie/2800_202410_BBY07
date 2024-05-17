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
	 * Returns whether there is an active and valid token
	 * currently set.
	 */
	export async function isAuthorized() {
		try {
			await api.get('/user/login');
			return true;
		} catch {
			return false;
		}
	}
}
