import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to ensure that the user object exists in the current session information, if it does exist it means that the given user is currently authenticated.
 */
export function requireLogin(req: Request, res: Response, next: NextFunction) {
	if (req.session.user) {
		next();
	} else res.status(401).json({ error: 'Authentication is required' });
}
