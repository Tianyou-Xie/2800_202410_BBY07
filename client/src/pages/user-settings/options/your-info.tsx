import { api } from '../../../lib/axios';
import { useState } from 'react';

import ModalConfirmation from '../../../components/ModalConfirmation/ModalConfirmation';
import Button from 'react-bootstrap/Button';

interface Props {
    infoBody: {
        showInfoBody: boolean,
        setInfoBody: any
    }
}

const YourInfoModal = (props: Props) => {
	const userInfo = async () => {
		try {			
			const response = await api.get('/user/');
			const data = response.data.value;
			document.getElementById('username')!.innerHTML = data.userName;
			document.getElementById('email')!.innerHTML = data.email;

			if (data.bio) {
				document.getElementById('bio')!.innerHTML = "Bio: " + data.bio;
			} else {
				document.getElementById('bio')!.innerHTML = "Follower Count: " + data.followerCount;
			}		

		} catch (error: any) {
			console.log('could not get information');
		}
	};
	userInfo();

	return (
		<>
			<ModalConfirmation
				title='Your Information'
				show={props.infoBody.showInfoBody}
				onHide={() => props.infoBody.setInfoBody(false)}
				body={
					<>
                        <p>
							Username: <span id='username'></span><br/>
							Email: <span id='email'></span><br/>
							<span id='bio'></span><br/>
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