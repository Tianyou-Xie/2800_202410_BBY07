import styles from '../user-settings.module.css';

import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';
import Button from 'react-bootstrap/Button';

interface Props {
    deleteBody1: {
        showDeleteBody1: boolean,
        setShowDelete1: any
    },
    deleteBody2: {
        showDeleteBody2: boolean,
        setShowDelete2: any
        deleteAccount: any,
        confInput: string,
        setConfInput: any
    },
}

const DeleteAccountModal = (props: Props) => {
	return (
		<>
			<ModalConfirmation
				title='Delete Account'
				show={props.deleteBody1.showDeleteBody1}
				onHide={() => props.deleteBody1.setShowDelete1(false)}
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
					<p>Type in the following phrase to delete this account:<br/><i><b>I-WANT-TO-DELTE-THIS-ACCOUNT</b></i></p>
						<form onSubmit={props.deleteBody2.deleteAccount}>
							<input
								className='mb-5'
								name='confirminput'
								placeholder='"I-WANT-TO-DELTE-THIS-ACCOUNTt"'
								type='text'
								value={props.deleteBody2.confInput}
								onChange={(event) => props.deleteBody2.setConfInput(event.target.value)}
								required
							/>
							<div className='d-flex justify-content-center align-items-center'>
								<button className={`${styles.deleteBtn} me-3`} type='submit'>DELETE ACCOUNT</button>
								<button className='ms-3' type='button' onClick={() => props.deleteBody2.setShowDelete2(false)}>
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

export default DeleteAccountModal;