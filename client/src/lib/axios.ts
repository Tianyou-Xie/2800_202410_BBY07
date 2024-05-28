import axios from 'axios';
import { getServerHost } from '../environment';
import { buildWebStorage, setupCache } from 'axios-cache-interceptor';

/**
 * The server hostname, used to prefix
 * all API requests.
 */
const host = getServerHost();

/**
 * The path patterns that will be cached by the API cache.
 * Cache TTL is 5 minutes by default.
 */
let cachedPaths: string[] = ['^/planet.*$', '^/post/.*/(like|save|parent)$'];

// TODO invalidate when saving or liking

/**
 * API Axios instance to access server API routes.
 *
 * This automatically handles the authorization header,
 * URL host prefixing and caching.
 */
export const api = setupCache(axios.create({ baseURL: host }), {
	storage: buildWebStorage(localStorage, 'skynet-cache:'),
	cachePredicate: {
		responseMatch: (res) => {
			const req = res.request as XMLHttpRequest;
			if (!req) return false;

			const path = req.responseURL.replace(host, '');
			for (const pattern of cachedPaths) {
				if (path.match(pattern)) return true;
			}

			return false;
		},
	},
});
