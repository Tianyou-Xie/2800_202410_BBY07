import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { UserModel } from '../../../models/user';
import { Request } from 'express';
import { AuthAdapter } from '../auth-adapter';

export class GoogleOAuthAdapter implements AuthAdapter {
	/**
	 * The client ID used to access the OAuth client API.
	 */
	private static CLIENT_ID: string;

	/**
	 * The OAuth Secret used to access the OAuth Client API.
	 */
	private static SECRET: string;

	/**
	 * The redirect URL that the OAuth consent screen will redirect to.
	 */
	private static REDIRECT_URL: string;

	/**
	 * Generates a new Google OAuth client and google OAuth API client with the static variables.
	 */
	public static generateClients = () => {
		const authClient = new OAuth2Client({
			clientId: this.CLIENT_ID,
			clientSecret: this.SECRET,
			redirectUri: this.REDIRECT_URL,
		});

		const googleClient = google.oauth2({ auth: authClient, version: 'v2' });

		return { authClient, googleClient };
	};

	/**
	 * Assigns static variables and provides helpful
	 * errors if any of the setup went wrong.
	 */
	static {
		const id = process.env.GOOGLE_OAUTH_ID;
		if (typeof id !== 'string') throw 'GOOGLE_OAUTH_ID is not present in environment variables.';

		this.CLIENT_ID = id;

		const secret = process.env.GOOGLE_OAUTH_SECRET;
		if (typeof secret !== 'string') throw 'GOOGLE_OAUTH_ID is not present in environment variables.';

		this.SECRET = secret;
		this.REDIRECT_URL = 'http://127.0.0.1:3000/user/oauth/google';
	}

	public parseToken(req: Request) {
		const authCode = req.query.code;
		if (typeof authCode === 'string') return authCode;
	}

	public async verifyToUser(token: string) {
		const googleUser = await this.verifyToGoogleUser(token);
		if (!googleUser) return;

		const googleId = googleUser.id;
		if (!googleId) return;

		const foundUser = await UserModel.findOne({ 'sso.id': googleId });
		if (foundUser) return foundUser;

		const userName = googleUser.name;
		if (!userName) return;

		const newUser = new UserModel({
			userName: userName,
			avatarUrl: googleUser.picture,
		});

		try {
			await newUser.save();
			return newUser;
		} catch {}
	}

	/**
	 * Given the specified Google OAuth authentication code,
	 * returns a Google user.
	 */
	private async verifyToGoogleUser(authCode: string) {
		try {
			const { authClient, googleClient } = GoogleOAuthAdapter.generateClients();
			const tokenResponse = await authClient.getToken(authCode);

			const idToken = tokenResponse.tokens.id_token;
			if (!idToken) return;

			authClient.setCredentials(tokenResponse.tokens);
			const googleUser = await googleClient.userinfo.get();

			return googleUser.data;
		} catch {}
	}
}
