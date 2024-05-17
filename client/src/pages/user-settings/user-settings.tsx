import { useState } from 'react';
import { api } from '../../lib/axios';
import { useLocation } from 'wouter';

import styles from './user-settings.module.css';

import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Header from '../../components/Header/Header';
import Hotbar from '../../components/Hotbar/Hotbar';
import ChangePasswordModal from './options/change-password';
import DeleteAccountModal from './options/delete-account';

const UserSettings = () => {
	const [_, setLocation] = useLocation();

	// variables responsible for showing change password modals
	const [showPassBody1, setShowPass1] = useState(false);
	const [showPassBody2, setShowPass2] = useState(false);

	// variables responsible for showing delete account modals
	const [showDeleteBody1, setShowDelete1] = useState(false);
	const [showDeleteBody2, setShowDelete2] = useState(false);

	//variables resposible for grabbing the form fields present in the change password modal
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	
	// varriables responsible for grabbing form fields in the delete account modal
	const [confInput, setConfInput] = useState('');

	const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.patch('/user/changepassword', {
				password,
				newpassword: newPassword,
				confirmpassword: confirmPassword,
			});
			alert('Password changed!');
		} catch (error: any) {
			alert('Could not change password.');
		}
	};	

	const deleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (confInput === "I-WANT-TO-DELTE-THIS-ACCOUNT") {
			try {
				const response = await api.post('/user/deleteaccount/delete');
				setLocation('/login');
			} catch (error: any) {
				alert(error.response.data.message);
			}
		} else {
			alert('Invalid Phrase');
		}
	};

	const passBody1 = {
		showPassBody1: showPassBody1,
		setShowPass1: setShowPass1
	}

	const passBody2 = {
		showPassBody2: showPassBody2,
		setShowPass2: setShowPass2,
		changePassword: changePassword,
		password: password,
		setPassword: setPassword,
		newPassword: newPassword,
		setNewPassword: setNewPassword,
		confPassword: confirmPassword,
		setConfPassword: setConfirmPassword
	}

	const deleteBody1 = {
		showDeleteBody1: showDeleteBody1,
		setShowDelete1: setShowDelete1
	}

	const deleteBody2 = {
		showDeleteBody2: showDeleteBody2,
		setShowDelete2: setShowDelete2,
		deleteAccount: deleteAccount,
		confInput: confInput,
		setConfInput: setConfInput
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
						<ListGroup.Item className={`${styles.clickable} ms-5`}>
							<Nav.Link href='/#link'>Change Username</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`${styles.clickable} ms-5`} onClick={() => setShowPass1(true)}>
							Change Password
						</ListGroup.Item>
						<ListGroup.Item className={`${styles.clickable} ms-5`}>
							<Nav.Link href='/#link'>Change Email</Nav.Link>
						</ListGroup.Item>
						<ListGroup.Item className={`${styles.clickable} ms-5`} onClick={() => setShowDelete1(true)}>
							DELETE ACCOUNT
						</ListGroup.Item>
					</ListGroup>
				</ListGroup.Item>
			</ListGroup>
			<Hotbar />

			<ChangePasswordModal passBody1={passBody1} passBody2={passBody2} />
			<DeleteAccountModal deleteBody1={deleteBody1} deleteBody2={deleteBody2}/>
		</>
	);
};

export default UserSettings;
