import { HydratedDocument } from 'mongoose';
import { IUser } from '../models/user';

declare global {
	namespace Express {
		export interface Request {
			user?: HydratedDocument<IUser>;
		}
	}
}
