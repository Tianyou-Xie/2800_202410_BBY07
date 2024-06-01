/* Stylesheet imports */
import styles from './reset-password.module.css';

/* Import from react and toastify */
import React, { useState } from 'react';
import { toast } from 'react-toastify';

/* Import from wouter */
import { useLocation } from 'wouter';

/* Imports for frontend api call and authentication verification */
import { api } from '../../lib/axios';

/* Imports from other components created */
import Page from '../../components/kebab-page/kebab-page';

/* Import from local files */
import logoUrl from '../../assets/images/skynet-logo.png';

/* Define the Props interface */
interface Props {
	token: string;
}

/**
 * Constructs, manages, and returns the Resetpassword component.
 *
 * @param token The token used to reset the password
 * @return The Resetpassword component as a JSX.Element
 */
const Resetpassword: React.FC<Props> = ({ token }) => {
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');

	const [_, navigate] = useLocation();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (loading) return;
		setLoading(true);

		try {
			await api.patch(`/user/resetpassword/${token}`, {
				password,
				confirmpassword,
			});

			navigate('/login');
			toast.info('Your password has been reset!');
		} catch (error: any) {
			toast.error(error.response.data.error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Page
			pageName={'Reset Password'}
			content={
				<div className={styles.resetpasswordContainer}>
					<div className='px-4 pb-2 text-center'>
						<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
						<h1 className={styles.h1}>RESET PASSWORD</h1>
						<div className={`${styles.resetpasswordUpperdiv} mb-1'`}></div>
						<div className={styles.resetpasswordForm}>
							<form onSubmit={handleSubmit}>
								<input
									name='password'
									placeholder='New Password'
									type='password'
									className={styles.input}
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
								/>
								<br />
								<input
									name='confirmpassword'
									placeholder='Confirm New Password'
									type='password'
									className={styles.input}
									value={confirmpassword}
									onChange={(event) => setConfirmPassword(event.target.value)}
									required
								/>
								<br />
								<div className={`text-center`}>
									<button className={`${styles.button}`} type='submit'>
										RESET PASSWORD
									</button>
								</div>
							</form>
						</div>
						<div className={`${styles.resetpasswordBottomdiv} mt-2`}></div>
					</div>
				</div>
			}
		/>
	);
};

export default Resetpassword;
