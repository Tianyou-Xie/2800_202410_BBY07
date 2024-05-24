import { Link, useLocation } from 'wouter';
import styles from './login.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import { GoogleAuthButton } from '../../components/google-auth-btn/google-auth-btn';

const LoginHtml = ({ email, password, setEmail, setPassword, submitForm, loading }: any) => {
	const [_, navigate] = useLocation();

	return (
		<div className={styles.loginContainer}>
			<div className='px-4 text-center'>
				<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
				<h1 className={styles.h1}>SKY.NET</h1>
				<h5 className={styles.h5}>Stay Connected Across The Galaxy</h5>
				<div className={`${styles.loginUpperdiv} mb-1`}></div>
				<div className={styles.loginForm}>
					<form onSubmit={submitForm}>
						<input
							name='email'
							placeholder='EMAIL'
							type='email'
							className={styles.input}
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							name='password'
							placeholder='********'
							type='password'
							className={styles.input}
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button disabled={loading} className={`${styles.button} mb-3`}>
							Login
						</button>
					</form>

					<hr />

					<div className='d-flex flex-column'>
						<GoogleAuthButton disabled={loading} text='Login with Google' className={styles.button} />
					</div>

					<hr />

					<div className='mb-4'>
						<span className={styles.span}>New User? Sign Up Instead</span>
						<button
							disabled={loading}
							onClick={() => navigate('/signup')}
							className={`${styles.loginButtonLogin} ${styles.button}`}>
							Sign Up
						</button>
					</div>

					<hr />

					<Link href='/forgetpassword' className={`${styles.span} small mb-0`}>
						Forgot your password?
					</Link>
				</div>
				<div className={`${styles.loginBottomdiv} mt-2`}></div>
			</div>
		</div>
	);
};

export default LoginHtml;
