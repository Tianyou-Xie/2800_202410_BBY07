/* Stylesheet imports */
import styles from '../user-settings-page.module.css';

/* Import from wouter */
import { useLocation } from 'wouter';

/* Imports for frontend api call and authentication verification */
import { api } from '../../../lib/axios';
import { Auth } from '../../../lib/auth';

/* Imports from React */
import { useState } from 'react';
import { toast } from 'react-toastify';

/* Imports from react-bootstrap */
import ListGroup from 'react-bootstrap/ListGroup';

/* Icon imports from react-icons */
import { MdOutlineArrowForwardIos } from 'react-icons/md';

/* Imports from other components created */
import ChangePasswordModal from './change-password-modal';
import DeleteAccountModal from './delete-account-modal';
import ChangeNameModal from './change-username-modal';
import ChangeEmailModal from './change-email-modal';
import Page from '../../../components/Page/Page';

const ManageAccount = () => {
	const [_, setLocation] = useLocation();

	// variables responsible for showing change password modals
	const [showPassBody1, setShowPass1] = useState(false);
	const [showPassBody2, setShowPass2] = useState(false);

	// variables responsible for showing delete account modals
	const [showDeleteBody1, setShowDelete1] = useState(false);
	const [showDeleteBody2, setShowDelete2] = useState(false);
	const [showDeleteBody3, setShowDelete3] = useState(false);

	// variables responsible for showing change username modals
	const [showNameBody1, setNameBody1] = useState(false);
	const [showNameBody2, setNameBody2] = useState(false);

	// variables responsible for showing change email modals
	const [showEmailBody1, setEmailBody1] = useState(false);
	const [showEmailBody2, setEmailBody2] = useState(false);

	//variables resposible for grabbing the form fields present in the change password modal
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// varriables responsible for grabbing form fields in the delete account modal
	const [confInput, setConfInput] = useState('');

	// varriables responsible for grabbing form fields in the change password modal
	const [nameInput, setNameInput] = useState('');

	//variables resposible for grabbing the form fields present in the change email modal
	const [currEmail, setCurrEmail] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [confEmailInput, setConfEmailInput] = useState('');

	/**
	 * Handles the patch request to change the user's password with the help of axios.
	 *
	 * @param event the form event from onSubmit.
	 */
	const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.patch('/user/changepassword', {
				password: password,
				newpassword: newPassword,
				confirmpassword: confirmPassword,
			});
			toast.success(response.data.message);
			wrapUpModal();
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	};

	/**
	 * Handles the delete request to delete the user's account with the help of axios.
	 *
	 * @param event the form event from onSubmit.
	 */
	const deleteAccount = async () => {
		try {
			const response = await api.post('/user/deleteaccount/delete', {
				confirmationInput: confInput,
			});
			toast.success(response.data.message);
			wrapUpModal();
			logout();
		} catch (error: any) {
			toast.error(error.response.data.error);
			setShowDelete3(false);
			setShowDelete2(true);
		}
	};

	/**
	 * Handles the patch request to change the user's username with the help of axios.
	 *
	 * @param event the form event from onSubmit.
	 */
	const changeUsername = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.patch('/user/changeUsername', {
				newUsername: nameInput,
			});
			toast.success(response.data.message);
			wrapUpModal();
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	};

	/**
	 * Handles the patch request to change the user's email with the help of axios.
	 *
	 * @param event the form event from onSubmit.
	 */
	const changeEmail = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.patch('/user/changeEmail', {
				currEmail: currEmail,
				newEmail: emailInput,
				confirmEmail: confEmailInput,
			});
			toast.success(response.data.message);
			wrapUpModal();
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
	};

	/**
	 * Reseta all inputs and visibility statuses of the modals.
	 */
	const wrapUpModal = () => {
		setPassword('');
		setNewPassword('');
		setConfirmPassword('');
		setConfInput('');
		setNameInput('');
		setCurrEmail('');
		setEmailInput('');
		setConfEmailInput('');
		setShowPass2(false);
		setShowDelete2(false);
		setNameBody2(false);
		setEmailBody2(false);
	};

	/**
	 * Logs the user out.
	 */
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
	const deleteBody3 = {
		showDeleteBody3: showDeleteBody3,
		setShowDelete3: setShowDelete3,
	}

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

	// defining values for the change email Modal
	const emailBody1 = {
		showEmailBody1: showEmailBody1,
		setEmailBody1: setEmailBody1,
	};
	const emailBody2 = {
		showEmailBody2: showEmailBody2,
		setEmailBody2: setEmailBody2,
		changeEmail: changeEmail,
		currEmail: currEmail,
		setCurrEmail: setCurrEmail,
		emailInput: emailInput,
		setEmailInput: setEmailInput,
		confEmailInput: confEmailInput,
		setConfEmailInput: setConfEmailInput,
	};

	return (
		<>
			<Page
				logoHeader={false}
				pageName='Manage Account'
				content={
					<ListGroup variant='flush' className={`${styles.settingBody} my-3`}>
						<ListGroup.Item className={`${styles.dangerZone}`}>
							<h1 className={`${styles.settingTitle} ms-3`}>Danger Zone</h1>
							<ListGroup variant='flush'>
								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setNameBody1(true)}>
									<div className={styles.groupItemBody}>
										<p>Change Username</p>
										<MdOutlineArrowForwardIos />
									</div>
								</ListGroup.Item>

								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setEmailBody1(true)}>
									<div className={styles.groupItemBody}>
										<p>Change Email</p>
										<MdOutlineArrowForwardIos />
									</div>
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setShowPass1(true)}>
									<div className={styles.groupItemBody}>
										<p>Change Password</p>
										<MdOutlineArrowForwardIos />
									</div>
								</ListGroup.Item>
								<ListGroup.Item
									className={`${styles.clickable} ms-5`}
									onClick={() => setShowDelete1(true)}>
									<div className={styles.groupItemBody}>
										<p>DELETE ACCOUNT</p>
										<MdOutlineArrowForwardIos />
									</div>
								</ListGroup.Item>
							</ListGroup>
						</ListGroup.Item>
					</ListGroup>
				}
			/>

			<ChangePasswordModal passBody1={passBody1} passBody2={passBody2} />
			<DeleteAccountModal deleteBody1={deleteBody1} deleteBody2={deleteBody2} deleteBody3={deleteBody3}/>
			<ChangeNameModal usernameBody1={usernameBody1} usernameBody2={usernameBody2} />
			<ChangeEmailModal emailBody1={emailBody1} emailBody2={emailBody2} />
		</>
	);
};

/**
 * Exports the user manage account page for external use.
 */
export default ManageAccount;
