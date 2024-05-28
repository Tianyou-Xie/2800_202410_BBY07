import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import Page from '../../components/Page/Page';
import styles from './messages.module.css';

const MessagesAll = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const { data: res } = await api.post('/user/conversations');
			try {
				if (res.success) {
					console.log(res.data);
					setUsers(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchUsers();
	}, []);
	return (
		<Page
			pageName='Messages'
			content={
				<div className='container mt-5'>
					<ul className='list-group'>
						{users.map((user, index) => (
							<li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
								<div className='d-flex align-items-center'>
									<div className={`${styles.messageIcon} mr-3`}>
										<span>A</span>
									</div>
									<div>
										<h5 className='mb-0'>Kamal Dolikay</h5>
									</div>
								</div>
								<small className='text-muted'>2024-05-21</small>
							</li>
						))}
					</ul>
				</div>
			}
		/>
	);
};

export default MessagesAll;
