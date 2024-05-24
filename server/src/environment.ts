import { config } from 'dotenv';

config();

const LOCAL_DEV = 'development_local';
const LOCAL_PROD = 'production_local';
const DEV = 'development';
const PROD = 'production';

/**
 * The environment that the server is currently running in.
 */
export const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === undefined) throw 'You must specify a NODE_ENV in the server environment variables.';

/**
 * The port that the server is currently running on.
 */
export const SERVER_PORT = process.env.PORT;
if (!SERVER_PORT) throw 'You must specify a PORT in the server environment variables.';

/**
 * Returns whether the server is running in development mode.
 */
export const isDev = () => NODE_ENV === LOCAL_DEV || NODE_ENV === DEV;

/**
 * Returns whether the server is running in production mode.
 */
export const isProd = () => NODE_ENV === LOCAL_PROD || NODE_ENV === PROD;

/**
 * Returns whether the server is running in local mode.
 */
export const isLocal = () => NODE_ENV === LOCAL_DEV || NODE_ENV === LOCAL_PROD;

/**
 * Returns the hostname of the client based on
 * the NODE_ENV specified in the environment variables.
 */
export const getClientHost = () => {
	let localClientPort = process.env.CLIENT_PORT;
	if (isLocal() && !localClientPort) {
		console.warn(
			'There is no client port specified, but you are running locally, please set CLIENT_PORT to the port your frontend is running on. (Using 8000 by default)',
		);

		localClientPort = '8000';
	}

	switch (NODE_ENV) {
		case LOCAL_DEV:
			return `http://127.0.0.1:${localClientPort}`;
		case LOCAL_PROD:
			return `http://127.0.0.1:${localClientPort}`;
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
	switch (NODE_ENV) {
		case LOCAL_DEV:
			return `http://127.0.0.1:${SERVER_PORT}`;
		case LOCAL_PROD:
			return `http://127.0.0.1:${SERVER_PORT}`;
		case DEV:
			return 'https://api.dev.skynetwork.app';
		case PROD:
			return 'https://api.skynetwork.app';
		default:
			throw 'Invalid NODE_ENV found in your environment variables!';
	}
};
