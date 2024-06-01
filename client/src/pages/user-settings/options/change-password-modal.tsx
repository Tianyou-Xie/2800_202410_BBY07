/* Imports from react-bootstrap */
import Button from 'react-bootstrap/Button';

/* Imports from other components created */
import ModalConfirmation from '../../../components/kebab-modal-confirmation/kebab-modal-confirmation';
import UIBox from '../../../components/kebab-uibox/kebab-uibox';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

/**
 * The properties and types for the ChangePasswordModal.
 */
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

/**
 * Contructs, manages, and returns the ChangePasswordModal component.
 *
 * @param props the props for this ChangePasswordModal, as seen outlined in the interface
 * @returns The ChangePasswordModal component as a JSX.Element
 */
const ChangePasswordModal = (props: Props) => {
	const [showOriginalPassword, setShowOriginalPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	/**
	 * Clears the current input feilds.
	 */
	const clearFields = () => {
		props.passBody2.setPassword('');
		props.passBody2.setNewPassword('');
		props.passBody2.setConfPassword('');
	};

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
						<p>Change Password</p>
					</div>
				}
				body={
					<>
						<div className='text-center d-flex align-items-center justify-content-center mx-3'>
							<form
								onSubmit={props.passBody2.changePassword}
								className='d-flex flex-column align-items-center justify-content-center gap-4'>
								<div className='d-flex align-items-start justify-content-between gap-4'>
									<UIBox
										content={
											<input
												name='password'
												placeholder='Current Password'
												type={showOriginalPassword ? 'text' : 'password'}
												value={props.passBody2.password}
												onChange={(event) => props.passBody2.setPassword(event.target.value)}
												required
											/>
										}
									/>

									<button
										type='button'
										className='w-auto d-flex align-items-center justify-content-center'
										onClick={() => setShowOriginalPassword(!showOriginalPassword)}>
										{showOriginalPassword ? <FaEyeSlash /> : <FaEye />}
									</button>
								</div>

								<div className='d-flex align-items-start justify-content-between gap-4'>
									<UIBox
										content={
											<input
												name='newpassword'
												placeholder='New Password'
												type={showNewPassword ? 'text' : 'password'}
												value={props.passBody2.newPassword}
												onChange={(event) => props.passBody2.setNewPassword(event.target.value)}
												required
											/>
										}
									/>

									<button
										type='button'
										className='w-auto d-flex align-items-center justify-content-center'
										onClick={() => setShowNewPassword(!showNewPassword)}>
										{showNewPassword ? <FaEyeSlash /> : <FaEye />}
									</button>
								</div>

								<div className='d-flex align-items-start justify-content-between gap-4'>
									<UIBox
										content={
											<input
												name='confirmpassword'
												placeholder='Confirm New Password'
												type={showNewPassword ? 'text' : 'password'}
												value={props.passBody2.confPassword}
												onChange={(event) =>
													props.passBody2.setConfPassword(event.target.value)
												}
												required
											/>
										}
									/>

									<button
										type='button'
										className='w-auto d-flex align-items-center justify-content-center'
										onClick={() => setShowNewPassword(!showNewPassword)}>
										{showNewPassword ? <FaEyeSlash /> : <FaEye />}
									</button>
								</div>

								<div className='d-flex justify-content-evenly align-items-center gap-2 my-3'>
									<div className='text-center'>
										<button className='btn btn-danger' type='submit'>
											Confirm
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

/**
 * Exports the ChangePasswordModal for external use.
 */
export default ChangePasswordModal;
