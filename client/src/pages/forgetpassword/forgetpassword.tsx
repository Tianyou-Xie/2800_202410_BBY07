import styles from './forgetpassword.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import React, { useState } from 'react';
import { api } from '../../lib/axios';
import Page from '../../components/Page/Page';

const Forgetpassword = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.post('/user/forgetpassword', { email });
			setMessage(response.data.message);
		} catch (error: any) {
			setMessage(error.response.data.error);
		}
	};

	return (
		<Page
			pageName={'Forget Password'}
			content={
				<div className={styles.forgetpasswordContainer}>
					<div className={`px-4 pb-2 text-center`}>
						<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
						<h1 className={styles.h1}>SKY.NET</h1>
						<h5 className={styles.h5}>FORGET YOUR PASSWORD? WE ARE HERE TO HELP!</h5>
						<div className={`${styles.forgetpasswordUpperdiv} mb-1'`}></div>
						<div className={styles.forgetpasswordForm}>
							<form onSubmit={handleSubmit}>
								<input
									name='email'
									placeholder='ENTER YOUR EMAIL'
									type='email'
									className={styles.input}
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									required
								/>
								<br />
								<div className={`text-center`}>
									<button className={`${styles.button}`} type='submit'>
										SUBMIT
									</button>
								</div>
							</form>
						</div>
						<div className={`${styles.forgetpasswordBottomdiv} mt-2`}></div>
						<div className={styles.message}>{message}</div>
					</div>
				</div>
			}
		/>
	);
};

export default Forgetpassword;
