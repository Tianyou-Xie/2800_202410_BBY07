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
					<ListGroup variant='flush' className={`${styles.settingBody}`}>
						{/* put them in a card */}
						<ListGroup.Item className={styles.groupItem}>
							<h1 className={`${styles.settingTitle} ms-3`}>Account</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`ms-5`}>
									<Nav.Link href=''>Followers</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`ms-5`}>
									<Nav.Link href=''>Following</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setInfoBody(true)}>
									Your Info
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setLocation('/settings/manageAccount')}>
									Manage
								</ListGroup.Item>
							</ListGroup>
						</ListGroup.Item>
						<ListGroup.Item className={styles.groupItem}>
							<h1 className={`${styles.settingTitle} ms-3`}>History</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`ms-5`}>
									<Nav.Link href=''>Saved</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`ms-5`}>
									<Nav.Link href=''>Liked</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`ms-5`}>
									<Nav.Link href=''>Commented Posts</Nav.Link>
								</ListGroup.Item>
							</ListGroup>
						</ListGroup.Item>
						<ListGroup.Item className={styles.groupItem}>
							<h1 className={`${styles.settingTitle} ms-3`}>General</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`ms-5`}>
									<Nav.Link href=''>About</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`ms-5`}>
									<Nav.Link href=''>FAQs</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`ms-5`}>
									<Nav.Link href=''>Support</Nav.Link>
								</ListGroup.Item>
							</ListGroup>
						</ListGroup.Item>
						<ListGroup.Item className={styles.groupItem}>
							<div className='w-100 d-flex justify-content-center my-5'>
								<button className='px-3 py-2'>
									<h1 onClick={logout} className={`${styles.settingTitle}`}>
										Logout
									</h1>
								</button>
							</div>
						</ListGroup.Item>
					</ListGroup>
				}
			/>

			<YourInfoModal infoBody={infoBody} />
		</>
	);
};

export default UserSettings;