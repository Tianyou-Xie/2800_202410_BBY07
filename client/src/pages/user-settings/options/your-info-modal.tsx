/* Imports from React */
import { useContext } from 'react';
import { Else, If, Then } from 'react-if';

/* Imports from react-bootstrap */
import Button from 'react-bootstrap/Button';

/* Import for the authorized user context */
import { UserAuthContext } from '../../../lib/auth';

/* Imports from other components created */
import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';

/**
 * The properties and types for the YourInfoModal.
 */
interface Props {
	infoBody: {
		showInfoBody: boolean;
		setInfoBody: any;
	};
}

/**
 * Contructs, manages, and returns the YourInfoModal component.
 * 
 * @param props the props for this YourInfoModal, as seen outlined in the interface
 * @returns The YourInfoModal component as a JSX.Element
 */
const YourInfoModal = (props: Props) => {
	const user = useContext(UserAuthContext);

	return (
		<>
			<ModalConfirmation
				title='Your Information'
				show={props.infoBody.showInfoBody}
				onHide={() => props.infoBody.setInfoBody(false)}
				body={
					<If condition={user}>
						<Then>
							<p>Username: {user.userName}</p>
							<p>Email: {user.email ?? 'Authenticated with Provider'}</p>
							<p>Bio: {user.bio ?? 'No Bio Provided'}</p>
						</Then>
						<Else>
							<p className='text-danger'>An error occured.</p>
						</Else>
					</If>
				}
				disableFooter={false}
				footer={
					<div className='w-100 d-flex justify-content-center'>
						<Button
							className='me-3'
							variant='secondary'
							onClick={() => {
								props.infoBody.setInfoBody(false);
							}}>
							Close
						</Button>
					</div>
				}
			/>
		</>
	);
};

/**
 * Exports the YourInfoModal for external use.
 */
export default YourInfoModal;
