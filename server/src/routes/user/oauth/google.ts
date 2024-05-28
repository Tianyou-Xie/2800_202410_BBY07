import { Handler } from 'express';
import { Resolve } from '../../../utils/express';
import { GoogleOAuthAdapter } from '../../../lib/auth/adapters/google-oauth';

/**
 * POST @ /user/oauth/google
 *
 * This returns a new Google authentication consent
 * screen URL to initiate a Google authentication.
 */
export const post: Handler = async (_, res) => {
	const { authClient } = GoogleOAuthAdapter.generateClients();

	Resolve(res).okWith(
		authClient.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
			prompt: 'consent',
		}),
	);
};
