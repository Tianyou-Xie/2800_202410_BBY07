import { Handler } from 'express';

export const get: Handler = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.warn(err);
			res.status(500).json({ error: 'Failed to destroy session.' });
		} else res.status(200).json({ message: 'Session destroyed.' });
	});
};
