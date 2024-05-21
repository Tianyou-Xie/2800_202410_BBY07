import { Handler } from 'express';
import { Resolve } from '../../../utils/express';
import { GoogleOAuthAdapter } from '../../../lib/auth/adapters/google-oauth';

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
