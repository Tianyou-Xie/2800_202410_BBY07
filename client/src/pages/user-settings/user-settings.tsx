import { useState } from 'react';
import { useLocation } from 'wouter';

import styles from './user-settings.module.css';

import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Page from '../../components/Page/Page';
import YourInfoModal from './options/your-info';
import { Auth } from '../../lib/auth';

const UserSettings = () => {
	const [_, setLocation] = useLocation();

	// variables responsible for showing your info modal
	const [showInfoBody, setInfoBody] = useState(false);

	// varriables responsible for grabbing form fields in the delete account modal
	const [confInput, setConfInput] = useState('');

	// calls loseToken() and logs the user out 
	function logout() {
		console.log('here');
		Auth.loseToken();
		setLocation('/login');
	}

	//defining values from the info modal
	const infoBody = {
		showInfoBody: showInfoBody,
		setInfoBody: setInfoBody,
	};

	return (
		<>
			<Page
				pageName='Settings'
				content={
					<ListGroup variant='flush' className={`${styles.settingBody} mt-3`}>
						<div className={`${styles.groupItemHolder} card p-4 rounded-0`}>
							<h1 className={`${styles.settingTitle} ms-1`}>Account</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link href=''>Followers</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link href=''>Following</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ${styles.groupItem} ms-5`}
									onClick={() => setInfoBody(true)}>
									Your Info
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ${styles.manageAccBtn} ${styles.groupItem} ms-5`}
									onClick={() => setLocation('/settings/manageAccount')}>
									Manage Account
								</ListGroup.Item>
							</ListGroup>
						</div>
						<div className={`${styles.groupItemHolder} card p-4 rounded-0`}>
							<h1 className={`${styles.settingTitle} ms-1`}>History</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link href=''>Saved</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link href=''>Liked</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link href=''>Commented Posts</Nav.Link>
								</ListGroup.Item>
							</ListGroup>
						</div>
						<div className={`${styles.groupItemHolder} card p-4 rounded-0`}>
							<h1 className={`${styles.settingTitle} ms-1`}>General</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link href=''>About</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link href=''>FAQs</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link href=''>Support</Nav.Link>
								</ListGroup.Item>
							</ListGroup>
						</div>
						<div className='w-100 d-flex justify-content-center mb-4'>
							<button className={`${styles.logoutBtn} py-2 px-3`}>
								<h1 onClick={logout} className={`${styles.settingTitle}`}>
									Logout
								</h1>
							</button>
						</div>
					</ListGroup>
				}
			/>

			<YourInfoModal infoBody={infoBody} />
		</>
	);
};

export default UserSettings;
