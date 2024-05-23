import Joi from 'joi';
import { Handler } from 'express';
import { authProtected } from '../../middlewares/auth-protected';
import { MessageModel } from '../../models/message';
import { ConversationModel } from '../../models/conversation';

interface PostBody {
	receiverId: string;
	content: string;
}

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
        
        const message = await MessageModel.find({conversationId: converationID._id});
        
        res.json({message})
    }
];