import { useLocation } from 'wouter';
import styles from './signup.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';

const SignupHtml = ({
	planets,
	username,
	email,
	password,
	location,
	setPlanets,
	setUsername,
	setEmail,
	setPassword,
	setLocation,
	submitForm,
}: any) => {
	const [_, navigate] = useLocation();
	return (
		<div className={styles.signupContainer}>
			<div className='px-4 text-center'>
				<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
				<h1 className={styles.h1}>SKY.NET</h1>
				<h5 className={styles.h5}>STAY CONNECTED ACROSS THE GALAXY</h5>
				<div className={`${styles.signupUpperdiv} mb-1`}></div>
				<div className={styles.signupForm}>
					<form onSubmit={submitForm}>
						<input
							name='username'
							placeholder='USERNAME'
							type='text'
							value={username}
							className={styles.input}
							required
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							name='email'
							placeholder='EMAIL'
							type='email'
							value={email}
							className={styles.input}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							name='password'
							placeholder='********'
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
							{/* <option value='xenos-prime'>Xenos Prime</option> */}
						</select>
						<div className='mb-3'>
							<button className={`${styles.button}`}>SIGN UP</button>
						</div>
					</form>
					<div>
						<span className={styles.span}>Already a User. Login Below</span>
						<button
							onClick={() => navigate('/login')}
							className={`${styles.signupButtonLogin} ${styles.button}`}>
							LOG IN
						</button>
					</div>
				</div>
				<div className={`${styles.signupBottomdiv} mt-2`}></div>
			</div>
		</div>
	);
};

export default SignupHtml;
