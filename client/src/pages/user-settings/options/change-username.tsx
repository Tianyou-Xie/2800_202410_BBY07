import styles from '../user-settings.module.css';

import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';
import Button from 'react-bootstrap/Button';

interface Props {
	usernameBody1: {
		showNameBody1: boolean;
		setNameBody1: any;
	};
	usernameBody2: {
		showNameBody2: boolean;
		setNameBody2: any;
		changeUsername: any;
		nameInput: string;
		setNameInput: any;
	};
}

const ChangeNameModal = (props: Props) => {
	const clearFields = () => {
		props.usernameBody2.setNameInput('');
	};

	return (
		<>
			<ModalConfirmation
				title='Change Username'
				show={props.usernameBody1.showNameBody1}
				body={
					<p>
						Are you sure you want to change your username?
					</p>
				}
				disableFooter={false}
				footer={
					<div className='w-100 d-flex justify-content-center'>
						<Button
							className='me-3'
							variant='secondary'
							onClick={() => {
								props.usernameBody1.setNameBody1(false);
							}}>
							Close
						</Button>
						<Button
							className='ms-3'
							variant='danger'
							onClick={() => {
								props.usernameBody1.setNameBody1(false);
								props.usernameBody2.setNameBody2(true);
							}}>
							Continue
						</Button>
					</div>
				}
			/>

			<ModalConfirmation
				title='Change Username'
				show={props.usernameBody2.showNameBody2}
				onHide={() => props.usernameBody2.setNameBody2(false)}
				body={
					<>
						<p>
							What would you like your username to be?
						</p>
						<form onSubmit={props.usernameBody2.changeUsername}>
							<input
								className={`${styles.confInput} mb-5 w-75`}
								name='newUsername'
								placeholder='Username'
								type='text'
								value={props.usernameBody2.nameInput}
								onChange={(event) => props.usernameBody2.setNameInput(event.target.value)}
								required
							/>
							<div className='d-flex justify-content-evenly align-items-center'>
								<button className='btn btn-danger' type='submit'>
									Change Username
								</button>
								<button
									className='btn btn-secondary'
									type='button'
									onClick={() => {
										props.usernameBody2.setNameBody2(false);
										clearFields();
									}}>
									Cancel
								</button>
							</div>
						</form>
					</>
				}
				disableFooter={true}
			/>
		</>
	);
};

export default ChangeNameModal;
