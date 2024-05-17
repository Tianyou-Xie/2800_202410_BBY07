import styles from './ModalConfirmation.module.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 *
 */
interface Props {
	title: string;
	header?: JSX.Element;
	body: JSX.Element;
	footer?: JSX.Element;
	disableFooter: boolean;
	show: boolean;
	onHide: () => void;
	onContinue?: any;
}

/**
 *
 * @param props
 * @returns
 */
const ModalConfirmation = (props: Props) => {
	return (
		<>
			<Modal className={`${styles.modal} p-2`} show={props.show} onHide={props.onHide} centered>
				{!props.header ? (
					<Modal.Header>
						<Modal.Title className={`${styles.headerFont} w-100 text-center`}>{props.title}</Modal.Title>
					</Modal.Header>
				) : (
					<div className={`${styles.headerFont} w-100 text-center`}>{props.header}</div>
				)}
				<Modal.Body className={`${styles.bodyFont} w-100 text-center`}>{props.body}</Modal.Body>
				{!props.disableFooter ? (
					!props.footer ? (
						<Modal.Footer className={styles.footerFont}>
							<div className='w-100 d-flex justify-content-center'>
								<Button className='me-3' variant='secondary' onClick={props.onHide}>
									Close
								</Button>
								<Button className='ms-3' variant='danger' onClick={props.onContinue}>
									Continue
								</Button>
							</div>
						</Modal.Footer>
					) : (
						<div className={`${styles.footerFont} p-4`}>{props.footer}</div>
					)
				) : (
					<></>
				)}
			</Modal>
		</>
	);
};

export default ModalConfirmation;
