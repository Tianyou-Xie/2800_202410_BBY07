import styles from './changepassword.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import React, { useState } from 'react';
import { api } from '../../lib/axios';

const Changepassword = () => {
	const [password, setPassword] = useState('');
	const [newpassword, setNewPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.patch('/user/changepassword', {
				password,
				newpassword,
				confirmpassword,
			});
			setMessage(response.data.message);
		} catch (error: any) {
			setMessage(error.response.data.message);
		}
	};

	return (
		<div className={styles.changepasswordContainer}>
			<div className={`px-4 pb-2 text-center`}>
				<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
				<h1 className={styles.h1}>CHANGE PASSWORD</h1>
				{/* <h5>FORGET YOUR PASSWORD? WE ARE HERE TO HELP!</h5> */}
				<div className={`${styles.changepasswordUpperdiv} mb-1`}></div>
				<div className={`${styles.changepasswordForm}`}>
					<form onSubmit={handleSubmit}>
						<input
							name='password'
							placeholder='Current Password'
							type='password'
							className={styles.input}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							required
						/>
						<br />
						<input
							name='newpassword'
							placeholder='New Password'
							type='password'
							className={styles.input}
							value={newpassword}
							onChange={(event) => setNewPassword(event.target.value)}
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
							<button type='submit' className={`${styles.button}`}>
								CHANGE PASSWORD
							</button>
						</div>
					</form>
				</div>
				<div className={`${styles.changepasswordBottomdiv} mt-2`}></div>
				<br />
				<div className={styles.message}>{message}</div>
			</div>
		</div>
	);
};

export default Changepassword;
