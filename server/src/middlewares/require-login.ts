import { NextFunction, Request, Response } from 'express';
import { Resolve } from '../utils/express';
import { AuthToken } from '../utils/auth-token';

/**
 * Middleware to ensure that the request includes a valid authorization token.
 * If it does not, it will resolve the request with an unautorized response.
 */
export async function requireLogin(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer'))
		return Resolve(res).unauthorized('Authentication is required.');

	const [_, token] = authHeader.split(' ')[1];

	const user = await AuthToken.verifyToUser(token);
	if (!user) return Resolve(res).unauthorized('Authentication is required.');

	req.user = user;
	next();
}
