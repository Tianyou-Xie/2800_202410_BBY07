import { Handler } from 'express';
import { authProtected } from '../../../middlewares/auth-protected';
import mongoose from 'mongoose';
import { Resolve } from '../../../utils/express';
import { FollowRelationship } from '../../../models/follow-relationship';
import { UserModel } from '../../../models/user';

/**
 * GET @ /user/:id/follow
 *
 * This returns whether the user making the request
 * has the followed the user with the given ID followed.
 */
export const get: Handler[] = [
    authProtected,
    async (req, res) => {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid user ID provided.');

        const currentUserId = req.user!.id;
        const existingInteraction = await FollowRelationship.exists({ targetUserId: id, initiateUserId: currentUserId });
        Resolve(res).okWith(!!existingInteraction);
    },
];

/**
 * POST @ /post/:id/follow
 *
 * This follow the user associated with the given ID as
 * the user making the request.
 */
export const post: Handler[] = [
    authProtected,
    async (req, res) => {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid user ID provided.');

        const targetUser = await UserModel.findById(id);
        if (!targetUser) return Resolve(res).notFound('Invalid user ID provided.');

        const currentUserId = req.user!._id;
        const existingInteraction = await FollowRelationship.exists({ targetUserId: id, initiateUserId: currentUserId }).lean();
        if (existingInteraction) return Resolve(res).badRequest('Target user is already followed.');

        const session = await mongoose.startSession();

        try {
            const interaction = await session.withTransaction(async () => {
                const interaction = new FollowRelationship({
                    targetUserId: id,
                    initiateUserId: currentUserId,
                });

                await interaction.save({ session });

                targetUser.followerCount++;
                await targetUser.save({ session });

                req.user!.followingCount++;
                await req.user!.save({ session });

                return interaction;
            });

            Resolve(res).okWith(interaction);
        } catch {
            Resolve(res).error('Error occured while trying to follow this user.');
        } finally {
            await session.endSession();
        }
    },
];

/**
 * DELETE @ /post/:id/follow
 *
 * This unfollows the user associated with the given
 * ID as the user making the request.
 */
export const del: Handler[] = [
    authProtected,
    async (req, res) => {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return Resolve(res).badRequest('Invalid user ID provided.');

        const targetUser = await UserModel.findById(id);
        if (!targetUser) return Resolve(res).notFound('Invalid user ID provided.');

        const currentUserId = req.user!.id;
        const interaction = await FollowRelationship.findOne({ targetUserId: id, initiateUserId: currentUserId });
        if (!interaction) return Resolve(res).badRequest('User is not followed.');

        const session = await mongoose.startSession();

        try {
            await session.withTransaction(async () => {
                await interaction.deleteOne({ session });

                targetUser.followerCount--;
                await targetUser.save({ session });

                req.user!.followingCount--;
                await req.user!.save({ session });

                return interaction;
            });

            Resolve(res).okWith(interaction);
        } catch {
            Resolve(res).error('Error occured while trying to unfollow this user.');
        } finally {
            await session.endSession();
        }
    },
];
