import styles from './user-settings.module.css';

import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Header from '../../components/Header/Header';

const UserSettings = () => {
	return (
		<>
			<Header pageName='Settings' />
			<ListGroup variant='flush' className={`${styles.settingBody}`}>
				<ListGroup.Item>
					<h1 className={`${styles.settingTitle} ms-3`}>Account</h1>
					<ListGroup variant='flush'>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Followers</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Following</Nav.Link>
						</ListGroup.Item>
					</ListGroup>
				</ListGroup.Item>
				<ListGroup.Item>
					<h1 className={`${styles.settingTitle} ms-3`}>History</h1>
					<ListGroup variant='flush'>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Saved</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Liked</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Commented Posts</Nav.Link>
						</ListGroup.Item>
					</ListGroup>
				</ListGroup.Item>
				<ListGroup.Item>
					<h1 className={`${styles.settingTitle} ms-3`}>General</h1>
					<ListGroup variant='flush'>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>About</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>FAQs</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Support</Nav.Link>
						</ListGroup.Item>
					</ListGroup>
				</ListGroup.Item>
				<ListGroup.Item>
					<h1 className={`${styles.settingTitle} ms-3`}>Danger Zone</h1>
					<ListGroup variant='flush'>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Change Profile Name</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Change Account Password</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Change Account Email</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>DELETE ACCOUNT</Nav.Link>
						</ListGroup.Item>
					</ListGroup>
				</ListGroup.Item>
			</ListGroup>
		</>
	);
};

export default UserSettings;
