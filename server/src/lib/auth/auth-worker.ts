import { Request } from 'express';
import { BasicJWTAdapter } from './adapters/basic-jwt';
import { GoogleOAuthAdapter } from './adapters/google-oauth';
import { AuthAdapter } from './auth-adapter';

const registeredAdapters = [new GoogleOAuthAdapter(), new BasicJWTAdapter()];

/**
 * Request authentication worker to authenticate
 * request depending on the authentication method.
 */
export class AuthWorker {
	private token?: string;

	/**
	 * Creates a new worker with the given request and adapter.
	 */
	private constructor(private req: Request, private adapter: AuthAdapter, tokenOverride?: string) {
		this.token = tokenOverride ?? this.adapter.parseToken(this.req);
	}

	/**
	 * Authenticates the request this worker was created from. If
	 * properly authenticated, adds the authenticated user to the request.
	 *
	 * @returns whether the request was authenticated
	 */
	public async authenticate() {
		if (!this.token) return false;

		const user = await this.adapter.verifyToUser(this.token);
		if (!user) return false;

		this.req.user = user;
		return true;
	}

	/**
	 * Automatically selects an adapter based on the given
	 * request.
	 */
	public static fromRequest(req: Request) {
		let foundToken;

		for (const adapter of registeredAdapters) {
			foundToken = adapter.parseToken(req);
			if (foundToken) return new AuthWorker(req, adapter, foundToken);
		}

		return new AuthWorker(req, registeredAdapters[0]);
	}
}
