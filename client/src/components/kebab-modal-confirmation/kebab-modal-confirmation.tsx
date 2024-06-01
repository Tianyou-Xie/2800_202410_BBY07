/* Stylesheet imports */
import styles from './kebab-modal-confirmation.module.css';

/* Imports from react-bootstrap */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 * The props types for the Confirmation Modal.
 */
interface Props {
	header?: JSX.Element;
	title?: string;
	body: JSX.Element;
	disableFooter: boolean;
	footer?: JSX.Element;
	show: boolean;
	onHide?: () => void;
	onContinue?: any;
}

/**
 * Creates a customized confirmation modal based upon given the properties.
 *
 * @param props the props for this modal as seen outlined in the interface.
 * @param props.header (Optional) Header of the modal as a JSX.Element. A default header that contians the title is provided if none is given.
 * @param props.title (Optional) Title of the modal as a string. Recommended to define if no header is provided.
 * @param props.body Body of the modal as a JSX.Element.
 * @param props.disableFooter Hides the default footer if true. A footer should be provided in the next prop.
 * @param props.footer Footer of the modal as a JSX.Element. A default footer will be provided if none is given.
 * @param show Boolean variable which dictates if the modal should appear. Changing this variable state must be handled externally.
 * @param props.onHide The function of type () => void that hides the modal.
 * @param props.onContinue (Optional) The function that initiates when the continue btn is pressed in the default footer.
 * @example See user-settings/options/change-password-modal.tsx
 * @returns The customized modal as a JSX.Element
 */
const ModalConfirmation = (props: Props) => {
	return (
		<>
			<Modal dialogClassName={`${styles.modal} p-2`} show={props.show} onHide={props.onHide} centered>
				{!props.header ? (
					<Modal.Header>
						<Modal.Title className={`${styles.headerFont} w-100 text-center`}>{props.title ? props.title : 'define title prop'}</Modal.Title>
					</Modal.Header>
				) : (
					<div className={`${styles.headerFont} w-100 text-center`}>{props.header}</div>
				)}
				<Modal.Body className={`${styles.modalBody} w-100 text-center`}>{props.body}</Modal.Body>
				{!props.disableFooter ? (
					!props.footer ? (
						<Modal.Footer className={styles.modalFooter}>
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
						<div className={`${styles.modalFooter} p-4`}>{props.footer}</div>
					)
				) : (
					<></>
				)}
			</Modal>
		</>
	);
};

/**
 * Exports the modal for external use.
 */
export default ModalConfirmation;
