import { useState, useEffect } from 'react';
import styles from './login.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import { api } from '../../lib/axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submitForm = async (e: any) => {
		e.preventDefault();

		const newUser = {
			email: email,
			password: password,
		};

		console.log(newUser);

		const apiUrl = '/user/login';
		try {
			const res = await api.post(apiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUser),
			});
			const data = await res.data;
			alert('logged in successfully');
		} catch (error) {
			alert('Error: check console');
			console.log(error);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className='px-4 text-center'>
				<img className='img-fluid' src={logoUrl} alt='Skynet Logo' />
				<h1>SKY.NET</h1>
				<h5>STAY CONNECTED ACROSS THE GALAXY</h5>
				<div className={`${styles.loginUpperdiv} mb-1`}></div>
				<div className={styles.loginForm}>
					<form onSubmit={submitForm}>
						<input
							name='email'
							placeholder='EMAIL'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							name='password'
							placeholder='********'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className='mb-3'>
							<button>LOGIN</button>
						</div>
					</form>
					<div className=''>
						<span>New User? Signup Below</span>
						<button className={styles.loginButtonLogin}>SIGN UP</button>
					</div>
				</div>
				<div className={`${styles.loginBottomdiv} mt-2`}></div>
			</div>
		</div>
	);
};

export default Login;
