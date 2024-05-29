/* Stylesheet imports */
import styles from '../user-settings-page.module.css';

/* Imports from other components created */
import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';

/* Imports from react-bootstrap */
import Button from 'react-bootstrap/Button';

/**
 * The properties and types for the DeleteAccountModal.
 */
interface Props {
	deleteBody1: {
		showDeleteBody1: boolean;
		setShowDelete1: any;
	};
	deleteBody2: {
		showDeleteBody2: boolean;
		setShowDelete2: any;
		deleteAccount: any;
		confInput: string;
		setConfInput: any;
	};
}

/**
 * Contructs, manages, and returns the DeleteAccountModal component.
 * 
 * @param props the props for this DeleteAccountModal, as seen outlined in the interface
 * @returns The DeleteAccountModal component as a JSX.Element
 */
const DeleteAccountModal = (props: Props) => {
	/**
	 * Clears the current input feilds.
	 */
	const clearFields = () => {
		props.deleteBody2.setConfInput('');
	};

	return (
		<>
			<ModalConfirmation
				title='Delete Account'
				show={props.deleteBody1.showDeleteBody1}
				body={
					<p>
						Are you sure you want to delete your account?
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
								props.deleteBody1.setShowDelete1(false);
							}}>
							Close
						</Button>
						<Button
							className='ms-3'
							variant='danger'
							onClick={() => {
								props.deleteBody1.setShowDelete1(false);
								props.deleteBody2.setShowDelete2(true);
							}}>
							Continue
						</Button>
					</div>
				}
			/>

			<ModalConfirmation
				title='Delete Account'
				show={props.deleteBody2.showDeleteBody2}
				onHide={() => props.deleteBody2.setShowDelete2(false)}
				body={
					<>
						<p>
							Type in the following phrase exactly to delete this account:
							<br />
							<i>
								<b>I-WANT-TO-DELETE-THIS-ACCOUNT</b>
							</i>
						</p>
						<form onSubmit={props.deleteBody2.deleteAccount}>
							<input
								className={`${styles.confInput} mb-5 w-75`}
								name='confirminput'
								placeholder='"I-WANT-TO-DELETE-THIS-ACCOUNT"'
								type='text'
								value={props.deleteBody2.confInput}
								onChange={(event) => props.deleteBody2.setConfInput(event.target.value)}
								required
							/>
							<div className='d-flex justify-content-evenly align-items-center'>
								<button className='btn btn-danger' type='submit'>
									DELETE ACCOUNT
								</button>
								<button
									className='btn btn-secondary'
									type='button'
									onClick={() => {
										props.deleteBody2.setShowDelete2(false);
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
 * Exports the DeleteAccountModal for external use.
 */
export default DeleteAccountModal;
