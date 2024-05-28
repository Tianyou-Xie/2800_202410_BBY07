import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { FollowRelationship } from '../../models/follow-relationship';
import { Resolve } from '../../utils/express';

/**
 * GET @ /user/following
 *
 * This returns the users that the user with the given ID is following.
 */

export const get: Handler[] = [

    authProtected,
    async (req, res) => {
        const user = req.user!;

        const followingId = await FollowRelationship.find({ initiateUserId: user._id })
            .populate('targetUserId', 'userName followerCount followingCount postCount avatarUrl')
            .lean();

        return Resolve(res).okWith(followingId.map(follow => follow.targetUserId));
    },
];