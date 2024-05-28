import Joi from 'joi';
import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { MessageModel } from '../../models/message';
import { ConversationModel } from '../../models/conversation';

interface PostBody {
	receiverId: string;
	content: string;
}

/**
 * POST @ /user/conversations
 * 
 * This returns all the list of users 
 * that one user has conversations or 
 * interacted with
 */
export const post: Handler[] = [
    authProtected,
    async (req, res) => {
        const user = req.user!;

        const converationID = await ConversationModel.find({
            $or: [
                {senderId: user._id},
                {receiverId: user._id},
            ]
        })

        const converation = await ConversationModel.aggregate([
            {
                $match: {
                  $or: [
                    { senderId: user._id },
                    { receiverId: user._id }
                  ]
                }
              },
              {
                $project: {
                  userId: {
                    $cond: { if: { $eq: ["$senderId", user._id] }, then: "$receiverId", else: "$senderId" }
                  }
                }
              },
              // useful code for future
              /*{
                $group: {
                  _id: null,
                  uniqueUserIds: { $addToSet: "$userId" }
                }
              }*/
        ])

        if (converationID == null){
            res.json({success: false})
            return
        }
        
        // const message = await MessageModel.find({conversationId: converationID._id});
        
        res.json({success: true, converationID, data: converation})
    }
];