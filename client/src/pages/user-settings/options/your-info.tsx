import { useContext } from 'react';

import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';
import Button from 'react-bootstrap/Button';
import { UserAuthContext } from '../../../lib/auth';
import { Else, If, Then } from 'react-if';

interface Props {
	infoBody: {
		showInfoBody: boolean;
		setInfoBody: any;
	};
}

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

export default YourInfoModal;
