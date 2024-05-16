import styles from './ModalConfirmation.module.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface Props {
	title: string,
	body: JSX.Element,
	show: boolean,
	onHide: () => void,
    onContinue: any
}

/**
 * 
 * @param props 
 * @returns 
 */
const ModalConfirmation = (props: Props) => {
	return (
		<>
			<Modal className={styles.modal} show={props.show} onHide={props.onHide} centered>
				<Modal.Header closeButton>
					<Modal.Title className='w-100 text-center'>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body className='text-center'>{props.body}</Modal.Body>
				<Modal.Footer>
					<div className='w-100 d-flex justify-content-center'>
						<Button className='me-3' variant='secondary' onClick={props.onHide}>
							Close
						</Button>
						<Button className='ms-3' variant='danger' onClick={props.onContinue}>
							Continue
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ModalConfirmation;
