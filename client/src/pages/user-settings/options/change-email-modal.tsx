/* Stylesheet imports */
import styles from '../user-settings-page.module.css';

/* Imports from react-bootstrap */
import Button from 'react-bootstrap/Button';

/* Imports from other components created */
import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';

/**
 * The properties and types for the ChangeEmailModal.
 */
interface Props {
	emailBody1: {
		showEmailBody1: boolean;
		setEmailBody1: any;
	};
	emailBody2: {
		showEmailBody2: boolean;
		setEmailBody2: any;
		changeEmail: any;
		currEmail: string;
		setCurrEmail: any;
		emailInput: string;
		setEmailInput: any;
		confEmailInput: string;
		setConfEmailInput: any;
	};
}

/**
 * Contructs, manages, and returns the ChangeEmailModal component.
 * 
 * @param props the props for this ChangeEmailModal, as seen outlined in the interface
 * @returns The ChangeEmailModal component as a JSX.Element
 */
const ChangeEmailModal = (props: Props) => {
	/**
	 * Clears the current input feilds.
	 */
	const clearFields = () => {
        props.emailBody2.setCurrEmail('');
		props.emailBody2.setEmailInput('');
		props.emailBody2.setConfEmailInput('');
	};

	return (
		<>
			<ModalConfirmation
				title='Change Email'
				show={props.emailBody1.showEmailBody1}
				body={<p>Are you sure you want to change your Email?</p>}
				disableFooter={false}
				footer={
					<div className='w-100 d-flex justify-content-center'>
						<Button
							className='me-3'
							variant='secondary'
							onClick={() => {
								props.emailBody1.setEmailBody1(false);
							}}>
							Close
						</Button>
						<Button
							className='ms-3'
							variant='danger'
							onClick={() => {
								props.emailBody1.setEmailBody1(false);
								props.emailBody2.setEmailBody2(true);
							}}>
							Continue
						</Button>
					</div>
				}
			/>

			<ModalConfirmation
				title='Change Email'
				show={props.emailBody2.showEmailBody2}
				onHide={() => props.emailBody2.setEmailBody2(false)}
				body={
					<>
						<p>What would you like your new email to be?</p>
						<form onSubmit={props.emailBody2.changeEmail}>
							<input
								className={`${styles.confInput} my-2 w-75`}
								name='currentEmail'
								placeholder='CURRENT EMAIL'
								type='text'
								value={props.emailBody2.currEmail}
								onChange={(event) => props.emailBody2.setCurrEmail(event.target.value)}
								required
							/>
							<input
								className={`${styles.confInput} mb-2 w-75`}
								name='newEmail'
								placeholder='NEW EMAIL'
								type='text'
								value={props.emailBody2.emailInput}
								onChange={(event) => props.emailBody2.setEmailInput(event.target.value)}
								required
							/>
							<input
								className={`${styles.confInput} mb-4 w-75`}
								name='newEmailConf'
								placeholder='CONFIRM NEW EMAIL'
								type='text'
								value={props.emailBody2.confEmailInput}
								onChange={(event) => props.emailBody2.setConfEmailInput(event.target.value)}
								required
							/>
							<div className='d-flex justify-content-evenly align-items-center'>
								<button className='btn btn-danger' type='submit'>
									Change Email
								</button>
								<button
									className='btn btn-secondary'
									type='button'
									onClick={() => {
										props.emailBody2.setEmailBody2(false);
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

/**
 * Exports the ChangeEmailModal for external use.
 */
export default ChangeEmailModal;
