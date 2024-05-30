import styles from './resetpassword.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import React, { useState } from 'react';
import { api } from '../../lib/axios';
import Page from '../../components/Page/Page';
import { toast } from 'react-toastify';
import { useLocation } from 'wouter';

interface Props {
	token: string;
}

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
									placeholder='Confirm Password'
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
