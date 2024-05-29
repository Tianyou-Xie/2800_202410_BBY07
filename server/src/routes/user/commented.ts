import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { UserModel } from '../../models/user';
import { PostModel } from '../../models/post';
import { Resolve } from '../../utils/express';

