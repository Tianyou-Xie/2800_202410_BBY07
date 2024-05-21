import { NextFunction, Request, Response } from 'express';
import { Resolve } from '../utils/express';
import { AuthWorker } from '../lib/auth/auth-worker';

/**
 * Middleware to ensure that the request includes a valid authorization token.
 * If it does not, it will resolve the request with an unautorized response.
 */
export async function requireLogin(req: Request, res: Response, next: NextFunction) {
	const worker = AuthWorker.fromRequest(req);

	const didAuthenticate = await worker.authenticate();
	if (!didAuthenticate) return Resolve(res).unauthorized('Authentication is required.');

	next();
}
