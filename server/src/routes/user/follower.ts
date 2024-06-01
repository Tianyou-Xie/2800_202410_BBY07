import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { FollowRelationship } from '../../models/follow-relationship';
import { Resolve } from '../../utils/express';

/**
 * GET @ /user/follower
 *
 * This returns the users that the user with the given ID is following.
 */

export const get: Handler[] = [

    authProtected,
    async (req, res) => {
        const user = req.user!;

        const followerId = await FollowRelationship.find({ targetUserId: user._id })
            .populate('initiateUserId', 'userName followerCount followingCount postCount avatarUrl')
            .lean();

        return Resolve(res).okWith(followerId.map(follow => follow.initiateUserId));
    },
];