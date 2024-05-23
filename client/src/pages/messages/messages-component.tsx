import MessagesHtml from './messages-html';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

const Messages = () => {
	const [message, setMessage] = useState('');

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
				// setMessage(res.value);
			} catch (error) {
				console.log(error);
			}
		};

		fetchMessages();
	}, []);

	const submitForm = async (e: any) => {
		console.log(message);
	};
	return <MessagesHtml email={message} setMessage={setMessage} submitForm={submitForm} />;
};

export default Messages;
