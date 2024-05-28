import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { Resolve } from '../../utils/express';

/**
 * GET @ /user
 *
 * This returns all information associated with
 * the user making the request.
 */
export const get: Handler[] = [
	authProtected,
	(req, res) =>
		req.user ? Resolve(res).okWith(req.user) : Resolve(res).unauthorized('Failed to authorize a correct user.'),
];
