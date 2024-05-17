import { useState, useEffect } from 'react';
import { api } from '../../lib/axios';

import styles from './user-settings.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';

import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Header from '../../components/Header/Header';
import ModalConfirmation from '../../components/ModalConfirmation/ModalConfirmation';
import Hotbar from '../../components/Hotbar/Hotbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const UserSettings = () => {
	// variables responsible for showing modals
	const [showPassBody, setShowPass] = useState(false);
	const [showPassBody2, setShowPass2] = useState(false);

	//variables resposible for grabbing the form fields present in the 2nd modal
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.patch('/user/changepassword', {
				password,
				newpassword: newPassword,
				confirmpassword: confirmPassword,
			});
			setMessage(response.data.message);
		} catch (error: any) {
			setMessage(error.response.data.message);
		}
	};

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

			{/* First Modal for password change */}
			<ModalConfirmation
				title='Change Password'
				show={showPassBody}
				onHide={() => setShowPass(false)}
				body={
					<p>
						Are you sure you want to change your password?
						<br />
						This action cannot be undone.
					</p>
				}
				disableFooter={false}
				footer={
					<div className='w-100 d-flex justify-content-center'>
						<Button
							className='me-3'
							variant='secondary'
							onClick={() => {
								setShowPass(false);
							}}>
							Close
						</Button>
						<Button
							className='ms-3'
							variant='danger'
							onClick={() => {
								setShowPass(false);
								setShowPass2(true);
							}}>
							Continue
						</Button>
					</div>
				}
			/>

			{/* Second Modal for password change */}
			<ModalConfirmation
				title='Change Password'
				show={showPassBody2}
				onHide={() => setShowPass2(false)}
				disableFooter={true}
				header={
					<>
						<img className={`img-fluid w-25`} src={logoUrl} alt='Skynet Logo' />
						<p>Change Password</p>
					</>
				}
				body={
					<>
						<div className='px-4 pb-2 text-center'>
							<div className='changepassword-upperdiv mb-1'></div>
							<div className='changepassword-form'>
								<form onSubmit={handleSubmit}>
									<input
										name='password'
										placeholder='Current Password'
										type='password'
										value={password}
										onChange={(event) => setPassword(event.target.value)}
										required
									/>
									<br />
									<input
										name='newpassword'
										placeholder='New Password'
										type='password'
										value={newPassword}
										onChange={(event) => setNewPassword(event.target.value)}
										required
									/>
									<br />
									<input
										name='confirmpassword'
										placeholder='Confirm New Password'
										type='password'
										value={confirmPassword}
										onChange={(event) => setConfirmPassword(event.target.value)}
										required
									/>
									<br />
									<div className='text-center mb-3'>
										<button type='submit'>Change Password</button>
									</div>
									<div className='text-center'>
										<button type='button' onClick={() => setShowPass2(false)}>
											Cancel
										</button>
									</div>
								</form>
							</div>
							<div className='changepassword-bottomdiv mt-2'></div>
							<br />
							<div className='message'>{message}</div>
						</div>
					</>
				}
			/>
		</>
	);
};

export default UserSettings;
