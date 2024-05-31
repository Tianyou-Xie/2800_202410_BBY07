/* Imports from React */
import { useContext } from 'react';
import { Else, If, Then } from 'react-if';

/* Imports from react-bootstrap */
import Button from 'react-bootstrap/Button';

/* Import for the authorized user context */
import { UserAuthContext } from '../../../lib/auth';

/* Imports from other components created */
import ModalConfirmation from '../../../components/modal-confirmation/modal-confirmation';

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
	const joinedDateFmt = new Intl.DateTimeFormat(navigator.language, { month: 'long', day: 'numeric', year: 'numeric' });

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
							<p>Bio: {user.bio ? user.bio : 'No Bio Provided'}</p>
							<p>Followers: {user.followerCount}</p>
							<p>Following: {user.followingCount}</p>
							<p>User Type: {!user.admin ? 'Basic user' : 'Administrator'}</p>
							<p>Account Created: {joinedDateFmt.format(new Date(user.createdAt))}</p>
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
