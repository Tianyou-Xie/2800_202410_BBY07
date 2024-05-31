import Joi from 'joi';
import { Handler } from 'express';
import { assertRequestBody, Resolve } from '../../utils/express';
import { authProtected } from '../../middlewares/auth-protected';
import { MessageModel } from '../../models/message';
import { ConversationModel } from '../../models/conversation';

interface PostBody {
	receiverId: string;
	content: string;
}

/**
 * POST @ /user/chat
 *
 * This creates a new chat message in the conversation
 * between the user making the request and the given receiver.
 */
export const post: Handler[] = [
	authProtected,
	async (req, res) => {
		const user = req.user!;
		const io = req.app.get('socketio');

		const postSchema = Joi.object<PostBody>({
			receiverId: Joi.string().trim().required(),
			content: Joi.string().trim().required(),
		});

		const bodyValidationResult = postSchema.validate(req.body);
		if (bodyValidationResult.error) return res.status(400).json({ error: bodyValidationResult.error.message });

		const value = bodyValidationResult.value;

		const converationID = await ConversationModel.findOne({
			$or: [
				{ senderId: user._id, receiverId: value.receiverId },
				{ receiverId: user._id, senderId: value.receiverId },
			],
		});

		if (converationID == null) {

			const conversation = new ConversationModel({
				senderId: user._id,
				receiverId: value.receiverId,
			});
			const convo = await conversation.save();

			const message = new MessageModel({
				conversationId: convo._id,
				senderId: user._id,
				content: value.content,
			});
			const data = await message.save();

            const messages = await MessageModel.aggregate([
                {
                    $match: { conversationId: data.conversationId }
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

            io.to(data.conversationId.toHexString()).emit('displayMessage', messages);
			return Resolve(res).okWith(data,'Message saved successfully.');
		}

		const message = new MessageModel({
			conversationId: converationID._id,
			senderId: user._id,
			content: value.content,
		});
		const data = await message.save();

        const messages = await MessageModel.aggregate([
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

		// io.emit('receiveMessage', messages);
        io.to(data.conversationId.toHexString()).emit('displayMessage', messages);
		return Resolve(res).okWith(data, 'Message saved successfully.');
	},
];
