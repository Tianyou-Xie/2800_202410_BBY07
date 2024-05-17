import { useLocation } from 'wouter';
import styles from './login.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';

const LoginHtml = ({ email, password, setEmail, setPassword, submitForm }: any) => {
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
						<div className='mb-3'>
							<a href='/forgetpassword' className={styles.span}>Forget your password?</a>
							<button className={`${styles.button}`}>Login</button>
						</div>
					</form>
					<div className=''>
						<span className={styles.span}>New User? Signup Below</span>
						<button
							onClick={() => navigate('/signup')}
							className={`${styles.loginButtonLogin} ${styles.button}`}>
							Sign Up
						</button>
					</div>
				</div>
				<div className={`${styles.loginBottomdiv} mt-2`}></div>
			</div>
		</div>
	);
};

export default LoginHtml;
