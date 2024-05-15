import { Handler } from 'express';
import { Resolve } from '../../utils/express';

export const get: Handler = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.warn(err);
			Resolve(res).error('Failed to destroy session.');
		} else Resolve(res).ok('Session destroyed.');
	});
};
