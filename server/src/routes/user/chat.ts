import Joi from 'joi';
import { Handler } from 'express';
// import { assertRequestBody, Resolve } from '../../utils/express';
import { requireLogin } from '../../middlewares/require-login';
import { MessageModel } from '../../models/message';
import { ConversationModel } from '../../models/conversation';

interface PostBody {
	receiverId: string;
	content: string;
}

export const post: Handler[] = [
    requireLogin,
    async (req, res) => {
        const user = req.user!;

        const converationID = await ConversationModel.findOne({
            $or: [
                {senderId: user._id, receiverId: req.body.receiverId},
                {receiverId: user._id, senderId: req.body.receiverId},
            ]
        })

        if (converationID == null){
            const conversation = new ConversationModel({
                senderId: user._id,
                receiverId: req.body.receiverId
            });

            const convo = await conversation.save();
            
            const message = new MessageModel({
                conversationId: convo._id,
                senderId: req.body.receiverId,
                content: req.body.content
            });

            await message.save();
            res.json({success: true})
            return
        }

        const message = new MessageModel({
			conversationId: converationID._id,
            senderId: req.body.receiverId,
            content: req.body.content
		});
        
        const data = await message.save();
        
        res.json({data})
    }
];