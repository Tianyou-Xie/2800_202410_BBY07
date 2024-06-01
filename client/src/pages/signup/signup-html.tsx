import { Link } from 'wouter';
import styles from './signup.module.css';
import logoUrl from '../../assets/images/skynet-logo.png';
import { GoogleAuthButton } from '../../components/google-auth-btn/google-auth-btn';
import { Else, If, Then } from 'react-if';
import { SmallLoader } from '../../components/loader/small-loader';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

/**
 * SignupHtml component handles the presentation layer for user signup.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Array<Object>} props.planets - The list of planets.
 * @param {string} props.username - The username entered by the user.
 * @param {string} props.email - The email entered by the user.
 * @param {string} props.password - The password entered by the user.
 * @param {Function} props.setUsername - The function to update the username.
 * @param {Function} props.setEmail - The function to update the email.
 * @param {Function} props.setPassword - The function to update the password.
 * @param {Function} props.setLocation - The function to update the location.
 * @param {Function} props.submitForm - The function to handle form submission.
 * @param {boolean} props.loading - The loading state to indicate form submission.
 * @returns {JSX.Element} The rendered signup HTML component.
 */

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
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className={styles.signupContainer}>
			<div className='px-3 text-center'>
				<img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
				<h1 className={styles.h1}>SKY.NET</h1>
				<h5 className={styles.h5}>STAY CONNECTED ACROSS THE GALAXY</h5>
				<div className={`${styles.signupUpperdiv} mb-1`}></div>
				<div className={`${styles.signupForm} p-3`}>
					<form onSubmit={submitForm} className='d-flex flex-column gap-4'>
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
