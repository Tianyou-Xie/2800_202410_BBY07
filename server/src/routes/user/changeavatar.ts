import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { Resolve } from '../../utils/express';
import { imageUpload } from '../../utils/image';

/**
 * PATCH @ /user/changeavatar
 *
 * This updates the avatar for the user making the request.
 */
export const patch: Handler[] = [
	authProtected,
	async (req, res) => {
		const url = req.body.avatarDataUrl;
		if (!url || typeof url !== 'string') return Resolve(res).badRequest('Invalid');

		const uploadResult = await imageUpload(url);
		if (!uploadResult) return Resolve(res).error('Unable to upload avatar image.');

		const user = req.user!;
		await user.updateOne({ avatarUrl: uploadResult.secure_url });

		Resolve(res).okWith(uploadResult.secure_url);
	},
];
