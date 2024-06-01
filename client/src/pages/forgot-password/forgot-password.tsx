/* Stylesheet imports */
import styles from './forgot-password.module.css';

import logoUrl from '../../assets/images/skynet-logo.png';

/* Import from React */
import React, { useState } from 'react';
import { Else, If, Then } from 'react-if';
import { toast } from 'react-toastify';

/* Imports for frontend api call and authentication verification */
import { api } from '../../lib/axios';

/* Imports for AxiosError and HttpStatusCode */
import { AxiosError, HttpStatusCode } from 'axios';

/* Imports from other components created */
import Page from '../../components/kebab-page/kebab-page';
import { SmallLoader } from '../../components/loader/small-loader';

/**
 * Constructs, manages, and returns the Forgetpassword component.
 *
 * @return The Forgetpassword component as a JSX.Element
 */
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
						<div className={`${styles.forgetpasswordForm} p-3 w-100`}>
							<p>Enter your email for a reset link:</p>
							<form onSubmit={handleSubmit}>
								<input
									name='email'
									placeholder='Enter your email'
									type='email'
									className={`${styles.input} mt-3 mx-auto`}
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									required
								/>
								<br />
								<div className='text-center mb-3 w-75 mx-auto'>
									<button disabled={loading} className={`${styles.button}`} type='submit'>
										Submit
									</button>
								</div>
								<div>
									<If condition={loading}>
										<Then>
											<SmallLoader />
										</Then>
									</If>
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
