import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../../lib/axios';
import { useLocation } from 'wouter';
import { Auth } from '../../../lib/auth';

import styles from '../user-settings.module.css';

import Nav from 'react-bootstrap/Nav';
import ListGroup from 'react-bootstrap/ListGroup';
import ChangePasswordModal from '../options/change-password-modal';
import DeleteAccountModal from '../options/delete-account-modal';
import ChangeNameModal from './change-username';
import Page from '../../../components/Page/Page';

const ManageAccount = () => {
	const [_, setLocation] = useLocation();

	// variables responsible for showing change password modals
	const [showPassBody1, setShowPass1] = useState(false);
	const [showPassBody2, setShowPass2] = useState(false);

	// variables responsible for showing delete account modals
	const [showDeleteBody1, setShowDelete1] = useState(false);
	const [showDeleteBody2, setShowDelete2] = useState(false);

	// variables responsible for showing change username modals
	const [showNameBody1, setNameBody1] = useState(false);
	const [showNameBody2, setNameBody2] = useState(false);

	//variables resposible for grabbing the form fields present in the change password modal
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// varriables responsible for grabbing form fields in the delete account modal
	const [confInput, setConfInput] = useState('');

	// varriables responsible for grabbing form fields in the change password modal
	const [nameInput, setNameInput] = useState('');

	const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.patch('/user/changepassword', {
				password: password,
				newpassword: newPassword,
				confirmpassword: confirmPassword,
			});
			toast.success(response.data.message);
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
		clearFields();
	};

	const deleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.post('/user/deleteaccount/delete', {
				confirmationInput: confInput,
			});
			toast.success(response.data.message);
			logout();
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
		clearFields();
	};

	const changeUsername = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.patch('/user/changeUsername', {
				newUsername: nameInput,
			});
			toast.success(response.data.message);
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
		clearFields();
	};

	const clearFields = () => {
		setPassword('');
		setNewPassword('');
		setConfirmPassword('');
		setConfInput('');
		setNameInput('');
	};

	const logout = () => [Auth.loseToken(), setLocation('/login')];

	// defining values for the Change Password Modal
	const passBody1 = {
		showPassBody1: showPassBody1,
		setShowPass1: setShowPass1,
	};
	const passBody2 = {
		showPassBody2: showPassBody2,
		setShowPass2: setShowPass2,
		changePassword: changePassword,
		password: password,
		setPassword: setPassword,
		newPassword: newPassword,
		setNewPassword: setNewPassword,
		confPassword: confirmPassword,
		setConfPassword: setConfirmPassword,
	};

	// defining values for the delete account Modal
	const deleteBody1 = {
		showDeleteBody1: showDeleteBody1,
		setShowDelete1: setShowDelete1,
	};
	const deleteBody2 = {
		showDeleteBody2: showDeleteBody2,
		setShowDelete2: setShowDelete2,
		deleteAccount: deleteAccount,
		confInput: confInput,
		setConfInput: setConfInput,
	};

	// defining values for the change username Modal
	const usernameBody1 = {
		showNameBody1: showNameBody1,
		setNameBody1: setNameBody1,
	};
	const usernameBody2 = {
		showNameBody2: showNameBody2,
		setNameBody2: setNameBody2,
		changeUsername: changeUsername,
		nameInput: nameInput,
		setNameInput: setNameInput,
	};

	return (
		<>
			<Page
				logoHeader={false}
				pageName='Manage Account'
				content={
					<ListGroup variant='flush' className={`${styles.settingBody} mt-3`}>
						<ListGroup.Item className={`${styles.dangerZone}`}>
							<h1 className={`${styles.settingTitle} ms-3`}>Danger Zone</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setNameBody1(true)}>
									Change Username
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setShowPass1(true)}>
									Change Password
								</ListGroup.Item>
								<ListGroup.Item className={`${styles.clickable} ms-5`}>
									<Nav.Link href=''>Change Email</Nav.Link>
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setShowDelete1(true)}>
									DELETE ACCOUNT
								</ListGroup.Item>
							</ListGroup>
						</ListGroup.Item>
					</ListGroup>
				}
			/>

			<ChangePasswordModal passBody1={passBody1} passBody2={passBody2} />
			<DeleteAccountModal deleteBody1={deleteBody1} deleteBody2={deleteBody2} />
			<ChangeNameModal usernameBody1={usernameBody1} usernameBody2={usernameBody2} />
		</>
	);
};

export default ManageAccount;
