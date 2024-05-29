/* Stylesheet imports */
import styles from './user-settings-page.module.css';

/* Import from wouter */
import { useLocation } from 'wouter';

/* Import for JWT token authorization */
import { Auth } from '../../lib/auth';

/* Imports from React */
import { useState } from 'react';

/* Imports from react-bootstrap */
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

/* Icon imports from react-icons */
import { MdOutlineArrowForwardIos } from 'react-icons/md';

/* Imports from other components created */
import Page from '../../components/Page/Page';
import YourInfoModal from './options/your-info-modal';

/**
 * Constructs, manages, and returns the user settings page.
 * 
 * @returns the user settings page as a JSX.Element
 */
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
				logoHeader={false}
				pageName='Settings'
				content={
					<ListGroup variant='flush' className={`${styles.settingBody} mt-3`}>
						<div className={`${styles.groupItemHolder} card p-4 rounded-0`}>
							<h1 className={`${styles.settingTitle} ms-1`}>Account</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link className={styles.groupItemBody} href='/followers'>
										<p>Followers</p>
										<MdOutlineArrowForwardIos />
									</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link className={styles.groupItemBody} href='/following'>
										<p>Following</p>
										<MdOutlineArrowForwardIos />
									</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ${styles.groupItem} ms-5`}
									onClick={() => setInfoBody(true)}>
									<div className={styles.groupItemBody}>
										<p>Your Info</p>
										<MdOutlineArrowForwardIos />
									</div>
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ${styles.groupItem} ms-5`}
									onClick={() => setLocation('/settings/manageAccount')}>
									<div className={styles.groupItemBody}>
										<p className={styles.warningColor}>Manage Account</p>
										<MdOutlineArrowForwardIos />
									</div>
								</ListGroup.Item>
							</ListGroup>
						</div>
						<div className={`${styles.groupItemHolder} card p-4 rounded-0`}>
							<h1 className={`${styles.settingTitle} ms-1`}>History</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link className={styles.groupItemBody} href='/saved'>
										<p>Saved</p>
										<MdOutlineArrowForwardIos />
									</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link className={styles.groupItemBody} href='/liked'>
										<p>Liked</p>
										<MdOutlineArrowForwardIos />
									</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link className={styles.groupItemBody} href='/commented'>
										<p>Commented Posts</p>
										<MdOutlineArrowForwardIos />
									</Nav.Link>
								</ListGroup.Item>
							</ListGroup>
						</div>
						<div className={`${styles.groupItemHolder} card p-4 rounded-0`}>
							<h1 className={`${styles.settingTitle} ms-1`}>General</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link className={styles.groupItemBody} href='/about'>
										<p>About</p>
										<MdOutlineArrowForwardIos />
									</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link className={styles.groupItemBody} href='/faqs'>
										<p>FAQs</p>
										<MdOutlineArrowForwardIos />
									</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.groupItem} ms-5`}>
									<Nav.Link className={styles.groupItemBody} href=''>
										<p>Support</p>
										<MdOutlineArrowForwardIos />
									</Nav.Link>
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

/**
 * Exports the user settings page for external use.
 */
export default UserSettings;
