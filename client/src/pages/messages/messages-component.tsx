import MessagesHtml from './messages-html';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { useParams } from 'wouter';
import io from 'socket.io-client';
import { getServerHost } from '../../environment';

const Messages = () => {
	let { id } = useParams();
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const [isChat, setIsChat] = useState(false);
	// const [socket, setSocket] = useState<any>(null);
	const [convoID, setConvoID] = useState('');
	const socket = io(getServerHost());

	useEffect((): any => {
		const fetchMessages = async () => {
			let headers = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
			};
			const { data: res } = await api.post('/user/getchats', { receiverId: id }, headers);
			try {
				console.log(res);
				if (res.success) {
					setIsChat(true);
					setMessages(res.message);
					setConvoID(res.message[0].conversationId);
					// setSocket(newSocket);
					socket.emit('sendID', res.message[0].conversationId);
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
			socket.on('receiveMessage', (data: any) => {
				arr = data;
			});
			socket.on('displayMessage', () => {
				setMessages((prevMessages) => [...prevMessages, arr]);
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
			socket.emit('sendMessage', convoID);
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
		/>
	);
};

export default Messages;
