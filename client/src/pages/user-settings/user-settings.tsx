import { useState, useEffect } from 'react';

import styles from './user-settings.module.css';

import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Header from '../../components/Header/Header';
import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';
import Hotbar from '../../components/Hotbar/Hotbar';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const UserSettings = () => {
	const initBody = (bodyDesc: string) => {
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

	const [modalPasswordBody, setPasswordBody] = useState(initBody('change your password'));
	const [modalEmailBody, setEmailBody] = useState(initBody('change your email'));
	const [modalNameBody, setNameBody] = useState(initBody('change your name'));
	const [modalDeleteBody, setDeleteBody] = useState(initBody('delete your account'));

	const handlePasswordChange = () => setPasswordBody(changePasswordForm());

	function changePasswordForm(): JSX.Element {
		return (
			<form>
				<FloatingLabel controlId='currentPassword' label='Current Password' className='mb-3'>
					<Form.Control type='password' placeholder='Current Password' />
				</FloatingLabel>
				<FloatingLabel controlId='newPassword' label='New Password'>
					<Form.Control type='password' placeholder='New Password' />
				</FloatingLabel>
				<FloatingLabel controlId='confirmPassword' label='Confirm Password'>
					<Form.Control type='password' placeholder='Confirm Password' />
				</FloatingLabel>
			</form>
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
						<ListGroup.Item className={`${styles.clickable} ms-5`} onClick={() => setShowPass(true)}>
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
				show={true}
				onHide={() => {
					setShowPass(false);
					setPasswordBody(initBody('change your password'));
				}}
				onContinue={handlePasswordChange}
			/>
		</>
	);
};

export default UserSettings;
