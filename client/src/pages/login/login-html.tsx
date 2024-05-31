import { Link } from 'wouter';
import styles from './login.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import { GoogleAuthButton } from '../../components/google-auth-btn/google-auth-btn';
import { If, Then, Else } from 'react-if';
import { SmallLoader } from '../../components/loader/small-loader';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginHtml = ({ email, password, setEmail, setPassword, submitForm, loading }: any) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className={styles.loginContainer}>
			<div className='px-3 text-center mb-3'>
				<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
				<h1 className={styles.h1}>SKY.NET</h1>
				<h5 className={styles.h5}>Stay Connected Across The Galaxy</h5>
				<div className={`${styles.loginUpperdiv} mb-1`}></div>
				<div className={`${styles.loginForm} p-3`}>
					<form onSubmit={submitForm} className='d-flex flex-column gap-4'>
						<input
							name='email'
							placeholder='Email'
							type='email'
							className={styles.input}
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<div className='d-flex align-align-items-center justify-content-center gap-2'>
							<input
								name='password'
								placeholder='Password'
								type={showPassword ? 'text' : 'password'}
								className={styles.input}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<button
								type='button'
								className={`${styles.button} w-auto p-2 d-flex align-items-center justify-content-center`}
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>

						<button type='submit' disabled={loading} className={`${styles.button} mb-3 w-100`}>
							<If condition={loading}>
								<Then>
									<SmallLoader />
								</Then>
								<Else>LOG IN</Else>
							</If>
						</button>
					</form>

					<hr className='m-2' />

					<div className='d-flex flex-column gap-2'>
						<GoogleAuthButton disabled={loading} className={styles.button} />
					</div>

					<hr />

					<div className='d-flex flex-column gap-2'>
						<Link href='/signup' className={`${styles.span} small mb-0`}>
							Not Registered? Sign up Instead
						</Link>

						<Link href='/forgetpassword' className={`${styles.span} small mb-0`}>
							Forgot your password?
						</Link>
					</div>
				</div>
				<div className={`${styles.loginBottomdiv} mt-2`}></div>
			</div>
		</div>
	);
};

export default LoginHtml;
