import { useState } from 'react';

import styles from '../user-settings.module.css';

import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';
import Button from 'react-bootstrap/Button';
import logoUrl from '../../../assets/images/SkynetLogo.png';

interface Props {
	passBody1: {
		showPassBody1: boolean;
		setShowPass1: any;
	};
	passBody2: {
		showPassBody2: boolean;
		setShowPass2: any;
		changePassword: any;
		password: string;
		setPassword: any;
		newPassword: string;
		setNewPassword: any;
		confPassword: string;
		setConfPassword: any;
	};
}

const ChangePasswordModal = (props: Props) => {
	const clearFields = () => {};

	return (
		<>
			{/* First Modal for password change */}
			<ModalConfirmation
				title='Change Password'
				show={props.passBody1.showPassBody1}
				onHide={() => props.passBody1.setShowPass1(false)}
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
								props.passBody1.setShowPass1(false);
							}}>
							Close
						</Button>
						<Button
							className='ms-3'
							variant='danger'
							onClick={() => {
								props.passBody1.setShowPass1(false);
								props.passBody2.setShowPass2(true);
							}}>
							Continue
						</Button>
					</div>
				}
			/>

			{/* Second Modal for password change */}
			<ModalConfirmation
				title='Change Password'
				show={props.passBody2.showPassBody2}
				onHide={() => props.passBody2.setShowPass2(false)}
				disableFooter={true}
				header={
					<div className='mt-3'>
						<img className={`img-fluid w-25`} src={logoUrl} alt='Skynet Logo' />
						<p>Change Password</p>
					</div>
				}
				body={
					<>
						<div className='text-center'>
							<form onSubmit={props.passBody2.changePassword}>
								<input
									className='mb-2'
									name='password'
									placeholder='Current Password'
									type='password'
									value={props.passBody2.password}
									onChange={(event) => props.passBody2.setPassword(event.target.value)}
									required
								/>
								<br />
								<input
									className='mb-2'
									name='newpassword'
									placeholder='New Password'
									type='password'
									value={props.passBody2.newPassword}
									onChange={(event) => props.passBody2.setNewPassword(event.target.value)}
									required
								/>
								<br />
								<input
									className='mb-2'
									name='confirmpassword'
									placeholder='Confirm New Password'
									type='password'
									value={props.passBody2.confPassword}
									onChange={(event) => props.passBody2.setConfPassword(event.target.value)}
									required
								/>
								<br />
								<div className='d-flex justify-content-evenly align-items-center my-3'>
									<div className='text-center'>
										<button
											className='btn btn-danger'
											type='submit'
											onClick={() => {
												props.passBody2.setShowPass2(false);
												clearFields();
											}}>
											Change Password
										</button>
									</div>
									<div className='text-center'>
										<button
											className='btn btn-secondary'
											type='button'
											onClick={() => {
												props.passBody2.setShowPass2(false);
												clearFields();
											}}>
											Cancel
										</button>
									</div>
								</div>
							</form>
						</div>
					</>
				}
			/>
		</>
	);
};

export default ChangePasswordModal;
