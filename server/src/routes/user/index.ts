import { Handler } from 'express';
import { requireLogin } from '../../middlewares/require-login';
import { Resolve } from '../../utils/express';

export const get: Handler[] = [
	requireLogin,
	(req, res) =>
		req.user ? Resolve(res).okWith(req.user) : Resolve(res).unauthorized('Failed to authorize a correct user.'),
];
