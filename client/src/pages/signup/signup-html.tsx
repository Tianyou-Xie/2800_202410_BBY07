import { Link } from 'wouter';
import styles from './signup.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import { GoogleAuthButton } from '../../components/google-auth-btn/google-auth-btn';
import { Else, If, Then } from 'react-if';
import { SmallLoader } from '../../components/loader/small-loader';

const SignupHtml = ({
	planets,
	username,
	email,
	password,
	setUsername,
	setEmail,
	setPassword,
	setLocation,
	submitForm,
	loading,
}: any) => {
	return (
		<div className={styles.signupContainer}>
			<div className='px-3 text-center'>
				<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
				<h1 className={styles.h1}>SKY.NET</h1>
				<h5 className={styles.h5}>STAY CONNECTED ACROSS THE GALAXY</h5>
				<div className={`${styles.signupUpperdiv} mb-1`}></div>
				<div className={`${styles.signupForm} p-3`}>
					<form onSubmit={submitForm}>
						<input
							name='username'
							placeholder='Username'
							type='text'
							value={username}
							className={styles.input}
							required
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							name='email'
							placeholder='Email'
							type='email'
							value={email}
							className={styles.input}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							name='password'
							placeholder='Password'
							type='password'
							value={password}
							className={styles.input}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<select
							name='planets'
							id='planets'
							defaultValue={planets[0]?._id}
							className={styles.select}
							required
							onChange={(e) => setLocation(e.target.value)}>
							{planets.map((planet: any, index: number) => {
								return (
									<option key={index} value={planet._id}>
										{planet.name}
									</option>
								);
							})}
						</select>
						<div className='mb-3'>
							<button disabled={loading} className={`${styles.button} w-100`}>
								<If condition={loading}>
									<Then>
										<SmallLoader />
									</Then>
									<Else>SIGN UP</Else>
								</If>
							</button>
						</div>
					</form>

					<hr />

					<GoogleAuthButton disabled={loading} className={styles.button} />

					<hr />

					<div className='d-flex flex-column gap-2'>
						<Link href='/login' className={`${styles.span} small mb-0`}>
							Already Registered? Login Instead
						</Link>
					</div>
				</div>

				<div className={`${styles.signupBottomdiv} mt-2`}></div>
			</div>
		</div>
	);
};

export default SignupHtml;
