import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';
import Button from 'react-bootstrap/Button';
import logoUrl from '../../../assets/images/SkynetLogo.png';

interface Props {
    passBody1: {
        showPassBody1: boolean,
        setShowPass1: any
    },
    passBody2: {
        showPassBody2: boolean,
        setShowPass2: any
        changePassword: any,
        password: string,
        setPassword: any,
        newPassword: string,
        setNewPassword: any,
        confPassword: string,
        setConfPassword: any
    },
}

const ChangePasswordModal = (props: Props) => {
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
					<>
						<img className={`img-fluid w-25`} src={logoUrl} alt='Skynet Logo' />
						<p>Change Password</p>
					</>
				}
				body={
					<>
						<div className='px-4 pb-2 text-center'>
							<div className='changepassword-form'>
								<form onSubmit={props.passBody2.changePassword}>
									<input
										name='password'
										placeholder='Current Password'
										type='password'
										value={props.passBody2.password}
										onChange={(event) => props.passBody2.setPassword(event.target.value)}
										required
									/>
									<br />
									<input
										name='newpassword'
										placeholder='New Password'
										type='password'
										value={props.passBody2.newPassword}
										onChange={(event) => props.passBody2.setNewPassword(event.target.value)}
										required
									/>
									<br />
									<input
										name='confirmpassword'
										placeholder='Confirm New Password'
										type='password'
										value={props.passBody2.confPassword}
										onChange={(event) => props.passBody2.setConfPassword(event.target.value)}
										required
									/>
									<br />
									<div className='text-center mb-3'>
										<button type='submit'>Change Password</button>
									</div>
									<div className='text-center'>
										<button type='button' onClick={() => props.passBody2.setShowPass2(false)}>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</>
				}
			/>
		</>
	);
};

export default ChangePasswordModal;
