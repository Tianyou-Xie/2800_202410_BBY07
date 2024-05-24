import { isMobile as mobileCheck } from 'is-mobile';

const LOCAL_DEV = 'development_local';
const LOCAL_PROD = 'production_local';
const DEV = 'development';
const PROD = 'production';

/**
 * The environment that the client is currently running in.
 */
export const NODE_ENV = import.meta.env.NODE_ENV;
if (NODE_ENV === undefined) throw 'You must specify a NODE_ENV in the server environment variables.';

/**
 * The port that the client is currently running on.
 */
export const CLIENT_PORT = import.meta.env.PORT;
if (!CLIENT_PORT) throw 'You must specify a PORT in the server environment variables.';

/**
 * Returns whether the client is running in development mode.
 */
export const isDev = () => NODE_ENV === LOCAL_DEV || NODE_ENV === DEV;

/**
 * Returns whether the client is running in production mode.
 */
export const isProd = () => NODE_ENV === LOCAL_PROD || NODE_ENV === PROD;

/**
 * Returns whether the client is running in local mode.
 */
export const isLocal = () => NODE_ENV === LOCAL_DEV || NODE_ENV === LOCAL_PROD;

/**
 * Returns the hostname of the client based on
 * the NODE_ENV specified in the environment variables.
 */
export const getClientHost = () => {
	switch (NODE_ENV) {
		case LOCAL_DEV:
			return `http://127.0.0.1:${CLIENT_PORT}`;
		case LOCAL_PROD:
			return `http://127.0.0.1:${CLIENT_PORT}`;
		case DEV:
			return 'https://dev.skynetwork.app';
		case PROD:
			return 'https://skynetwork.app';
		default:
			throw 'Invalid NODE_ENV found in your environment variables!';
	}
};

/**
 * Returns the hostname of the server based on
 * the NODE_ENV specified in the environment variables.
 */
export const getServerHost = () => {
	let localServerPort = import.meta.env.SERVER_PORT;
	if (isLocal() && !localServerPort) {
		console.warn(
			'There is no server port specified, but you are running locally, please set SERVER_PORT to the port your backend is running on. (Using 3000 by default)',
		);

		localServerPort = '3000';
	}

	switch (NODE_ENV) {
		case LOCAL_DEV:
			return `http://127.0.0.1:${localServerPort}`;
		case LOCAL_PROD:
			return `http://127.0.0.1:${localServerPort}`;
		case DEV:
			return 'https://api.dev.skynetwork.app';
		case PROD:
			return 'https://api.skynetwork.app';
		default:
			throw 'Invalid NODE_ENV found in your environment variables!';
	}
};

/**
 * Whether the client is running on a mobile device, this
 * could include a tablet.
 */
export const isMobile = mobileCheck({ tablet: true });
