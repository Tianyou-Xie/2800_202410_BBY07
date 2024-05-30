import styles from './forgetpassword.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import React, { useState } from 'react';
import { api } from '../../lib/axios';
import Page from '../../components/Page/Page';
import { toast } from 'react-toastify';
import { AxiosError, HttpStatusCode } from 'axios';
import { Else, If, Then } from 'react-if';
import { SmallLoader } from '../../components/loader/small-loader';

const Forgetpassword = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (loading) return;
		setLoading(true);

		try {
			await api.post('/user/forgetpassword', { email });
		} catch (error: any) {
			if (error instanceof AxiosError && error.response?.status === HttpStatusCode.InternalServerError)
				return toast.error('There was an error trying to reset you password, please try again later.');
		} finally {
			setLoading(false);
		}

		toast.info('If an account exists, a password reset email was sent.');
		setEmail('');
	};

	return (
		<Page
			pageName={'Forgot Password'}
			noHeader
			noNavbar
			content={
				<div className={styles.forgetpasswordContainer}>
					<div className={`px-4 pb-2 text-center`}>
						<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
						<h1 className={styles.h1}>SKY.NET</h1>
						<h5 className={styles.h5}>FORGET YOUR PASSWORD? WE ARE HERE TO HELP!</h5>
						<div className={`${styles.forgetpasswordUpperdiv} mb-1`}></div>
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
									<button disabled={loading} className={`${styles.button}`} type='submit'>
										<If condition={loading}>
											<Then>
												<SmallLoader />
											</Then>
											<Else>Submit</Else>
										</If>
									</button>
								</div>
							</form>
						</div>
						<div className={`${styles.forgetpasswordBottomdiv} mt-2`}></div>
					</div>
				</div>
			}
		/>
	);
};

export default Forgetpassword;
