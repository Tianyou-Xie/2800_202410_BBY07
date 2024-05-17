import { api } from '../../../lib/axios';

import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';
import Button from 'react-bootstrap/Button';

interface Props {
    infoBody: {
        showInfoBody: boolean,
        setInfoBody: any
    }
}

const YourInfoModal = (props: Props) => {

	const changePassword = async () => {
		try {
			
			const response = await api.get('/user/');
			const data = response.data.value;
			//toast.success('Password changed!');
		} catch (error: any) {
			//toast.error('Could not change password.');
			alert('could not get information');
		}
	};

	changePassword();

	return (
		<>
			<ModalConfirmation
				title='Your Information'
				show={props.infoBody.showInfoBody}
				onHide={() => props.infoBody.setInfoBody(false)}
				body={
					<>
                        <p>
							Username: <span></span><br/>
							Email: <span></span><br/>
							Bio: <span></span><br/>
						</p>
                    </>
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