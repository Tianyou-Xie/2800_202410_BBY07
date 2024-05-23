import MessagesHtml from './messages-html';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { useParams } from 'wouter';

const Messages = () => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [receiverID, setreceiverID] = useState('');
	let { id } = useParams();
	// setreceiverID(id);

	useEffect(() => {
		const fetchMessages = async () => {
			let headers = {
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
			};
			const { data: res } = await api.post('/user/getchats', { receiverId: id }, headers);
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
			receiverId: id,
		};
		try {
			const { data: res } = await api.post('/user/chat', newMessage);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<MessagesHtml message={message} messages={messages} setMessage={setMessage} submitForm={submitForm} id={id} />
	);
};

export default Messages;
