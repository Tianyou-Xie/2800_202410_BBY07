import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';
import Button from 'react-bootstrap/Button';

interface Props {
    infoBody: {
        showInfoBody: boolean,
        setInfoBody: any
    }
}

const YourInfoModal = (props: Props) => {
	return (
		<>
			<ModalConfirmation
				title='Your Information'
				show={props.infoBody.showInfoBody}
				onHide={() => props.infoBody.setInfoBody(false)}
				body={
					<>
                        user info
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