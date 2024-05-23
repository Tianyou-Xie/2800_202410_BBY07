import MessagesHtml from './messages-html';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

const Messages = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const fetchMessages = async () => {
			let headers = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
			};
			const { data: res } = await api.post('/user/getchats', { receiverId: '664399aff4853409512e9032' }, headers);
			try {
				console.log(res);
				setMessages(res.message);
			} catch (error) {
				console.log(error);
			}
		};

		fetchMessages();
	}, []);

	const submitForm = async (e: any) => {
		console.log(message);
		const newMessage = {
			content: message,
			receiverId: '664399aff4853409512e9032',
		};
		try {
			const { data: res } = await api.post('/user/chat', newMessage);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	return <MessagesHtml message={message} messages={messages} setMessage={setMessage} submitForm={submitForm} />;
};

export default Messages;
