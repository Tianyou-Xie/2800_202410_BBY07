import { useEffect, useState } from 'react';
import { Link } from "wouter";
import { api } from '../../lib/axios';
import Page from '../../components/page/page';
import styles from './messages.module.css';

/**
 * MessagesAll component displays all users with whom the current user has conversations.
 *
 * @component
 * @returns {JSX.Element} The rendered MessagesAll component.
 */
const MessagesAll = () => {
	const [users, setUsers] = useState([]);

     /**
     * Fetches users with conversations from the backend API.
     * @function fetchUsers
     */
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

    // Renders the component
	return (
		<Page
			pageName='Messages'
			content={
				<div className='container mt-5'>
					<ul className='list-group'>
						{users.map((user: any, index) => (
                            <Link key={index} href={`/messages/${user.userId}`} className={styles.userLink}>
							<li key={index} className={`${styles.listGroupItem} list-group-item d-flex justify-content-between align-items-center`}>
								<div className='d-flex align-items-center'>
                                    <img
                                        src={user.avatar}
                                        width='50'
                                        height='50'
                                        className={`rounded-circle me-2`}
                                    />
									<div>
										<h5 className='mb-0' style={{ textTransform: 'capitalize' }}>{user.name}</h5>
									</div>
								</div>
								<small className='text-muted'>2024-05-21</small>
							</li>
                            </Link>
						))}
					</ul>
				</div>
			}
		/>
	);
};

export default MessagesAll;
