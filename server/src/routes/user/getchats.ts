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
 * POST @ /user/getchat
 * 
 * This returns the messages in the conversation
 * between the user making the request and
 * the specified receiver.
 */
export const post: Handler[] = [
    authProtected,
    async (req, res) => {
        const user = req.user!;

        const converationID = await ConversationModel.findOne({
            $or: [
                {senderId: user._id, receiverId: req.body.receiverId},
                {receiverId: user._id, senderId: req.body.receiverId},
            ]
        })

        if (converationID == null){
            res.json({success: false})
            return
        }
        
        await MessageModel.find({conversationId: converationID._id});
        const message = await MessageModel.aggregate([
            {
                $match: { conversationId: converationID._id }
            },
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                messages: { $push: "$$ROOT" }
              }
            },
            {
              $sort: { "_id": 1 }
            }
          ]);
        
        res.json({success: true, message})
    }
];