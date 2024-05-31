import io from 'socket.io-client';
import { useParams } from 'wouter';
import MessagesHtml from './messages-html';
import { useEffect, useState, useContext } from 'react';
import { api } from '../../lib/axios';
import { getServerHost } from '../../environment';
import { UserAuthContext } from '../../lib/auth';

const Messages = () => {
	let { id } = useParams();
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const [isChat, setIsChat] = useState(false);
	const [convoID, setConvoID] = useState('');
	const socket = io(getServerHost());
	const [username, setUsername] = useState('');
	const [avatar, setAvatar] = useState('');
    const user = useContext(UserAuthContext);

	useEffect((): any => {
		const fetchMessages = async () => {
			const { data: res } = await api.post('/user/getchats', { receiverId: id });

			try {
				if (res.success) {
					setIsChat(true);
					setMessages(res.message);
					setConvoID(res.message[0].messages[0].conversationId);
					socket.emit('sendID', res.message[0].messages[0].conversationId);
				}
			} catch (error) {
				console.log(error);
			}

			const friend = await api.get(`/user/${id}`);
			try {
				if (friend.data.success) {
					setUsername(friend.data.value.userName);
					setAvatar(friend.data.value.avatarUrl);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchMessages();
		return () => socket.close();
	}, []);

	useEffect(() => {
		let arr: any;
		if (socket) {
			/* socket.on('receiveMessage', (data: any) => {
			arr = data;
			}); */
			socket.on('displayMessage', (data) => {
                console.log("arr", arr)
				// setMessages((prevMessages) => [...prevMessages, arr]);
                setMessages(data);
			});
		}
	}, [socket]);

	const submitForm = async (e: any) => {
		e.preventDefault();
		const newMessage = {
			content: message,
			receiverId: id,
		};

		try {
			const { data: res } = await api.post('/user/chat', newMessage);
			// socket.emit('sendMessage', res.value.conversationId);
			setMessage('');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<MessagesHtml
			message={message}
			messages={messages}
			setMessage={setMessage}
			submitForm={submitForm}
			id={id}
			isChat={isChat}
			username={username}
            avatar={avatar}
		/>
	);
};

export default Messages;
