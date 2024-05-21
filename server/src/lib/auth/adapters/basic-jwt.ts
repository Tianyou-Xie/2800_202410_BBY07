import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { UserModel } from '../../../models/user';
import { Request } from 'express';
import { JWT, JWTPayload } from '../../../utils/jwt';
import { AuthAdapter } from '../auth-adapter';

/**
 * Allows for creation and verification of JWT
 * authentication tokens.
 */
export class BasicJWTAdapter implements AuthAdapter {
	public parseToken(req: Request) {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer')) return;

		return authHeader.split(' ')[1];
	}

	public async verifyToUser(token: string) {
		try {
			const payload = jwt.verify(token, JWT.SECRET) as JWTPayload;
			if (!payload || !('userId' in payload)) return;

			const userId = payload.userId;
			if (!mongoose.isValidObjectId(userId)) return;

			return await UserModel.findById(userId);
		} catch {}
	}
}
