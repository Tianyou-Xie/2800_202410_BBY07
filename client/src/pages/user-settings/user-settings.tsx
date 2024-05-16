import { useState, useEffect } from 'react';

import styles from './user-settings.module.css';

import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Header from '../../components/Header/Header';
import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';
import Hotbar from '../../components/Hotbar/Hotbar';

const UserSettings = () => {
	const initialBody = (bodyDesc: string) => {
		return (
			<>
				<p>
					Are you sure you want to {bodyDesc}?
					<br />
					This action cannot be undone.
				</p>
			</>
		);
	};

	const [showPassBody, setShowPass] = useState(false);
	const [showEmailBody, setShowEmail] = useState(false);
	const [showNameBody, setShowName] = useState(false);
	const [showDeleteBod, setShowDelete] = useState(false);

	const [modalPasswordBody, setPasswordBody] = useState(initialBody('change your password'));
	const [modalEmailBody, setEmailBody] = useState(initialBody('change your email'));
	const [modalNameBody, setNameBody] = useState(initialBody('change your name'));
	const [modalDeleteBody, setDeleteBody] = useState(initialBody('delete your account'));

	const handlePasswordChange = () => setPasswordBody(changePasswordForm());
	//const handleEmailChange = () => setEmailBody();

	function changePasswordForm(): JSX.Element {
		return (
			<>
				<p>this is me</p>
			</>
		);
	}

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
						<ListGroup.Item className={`ms-5`} onClick={() => setShowPass(true)}>
							Change Password
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>Change Email</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`ms-5`}>
							<Nav.Link href='/#link'>DELETE ACCOUNT</Nav.Link>
						</ListGroup.Item>
					</ListGroup>
				</ListGroup.Item>
			</ListGroup>
			<Hotbar />

			<ModalConfirmation
				title='Change Password'
				body={modalPasswordBody}
				show={showPassBody}
				onHide={() => setShowPass(false)}
				onContinue={handlePasswordChange}
			/>
		</>
	);
};

export default UserSettings;
