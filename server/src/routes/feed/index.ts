import { Handler } from 'express';
import { PostModel } from '../../models/post';
import { Resolve } from '../../utils/express';

export const get: Handler = async (req, res) => {
	const rawPage = parseInt(typeof req.query.page === 'string' ? req.query.page : '');
	const page = Math.max(1, typeof rawPage !== 'number' || isNaN(rawPage) ? 1 : rawPage);
	const limit = 20;
	const skip = (page - 1) * limit;

	const latestPosts = await PostModel.find()
		.sort({ likeCount: 'descending', createdAt: 'ascending' })
		.skip(skip)
		.limit(limit)
		.lean();

	Resolve(res).okWith(latestPosts);
};
