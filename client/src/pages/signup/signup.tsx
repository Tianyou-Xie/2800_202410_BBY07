import { useState, useEffect } from 'react';
import styles from './signup.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';

const Signup = () => {
	interface Planet {
		_id: string;
		name: string;
	}
	const [planets, setPlanets] = useState<Array<Planet>>([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [location, setLocation] = useState('');

	useEffect(() => {
		const fetchPlanets = async () => {
			const apiUrl = import.meta.env.VITE_DEV + '/planet';
			console.log(apiUrl);
			try {
				const res = await fetch(apiUrl);
				const data = await res.json();
				setPlanets(data.value);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPlanets();
	}, []);

	const submitForm = async (e: any) => {
		e.preventDefault();

		const newUser = {
			email: email,
			userName: username,
			password: password,
			location: {
				latitude: '49.285061',
				longitude: '-122.794594',
				planetId: '664399a3036de6e77d00332f',
			},
		};

		console.log(newUser);

		const apiUrl = import.meta.env.VITE_DEV + '/user/signup';
		try {
			const res = await fetch(apiUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUser),
			});
			const data = await res.json();
			alert('new user created');
		} catch (error) {
			alert('Error: check console');
			console.log(error);
		}
	};

	return (
		<div className={styles.signupContainer}>
			<div className='px-4 text-center'>
				<img className='img-fluid' src={logoUrl} alt='Skynet Logo' />
				<h1>SKY.NET</h1>
				<h5>STAY CONNECTED ACROSS THE GALAXY</h5>
				<div className={`${styles.signupUpperdiv} mb-1`}></div>
				<div className={styles.signupForm}>
					<form onSubmit={submitForm}>
						<input
							name='username'
							placeholder='USERNAME'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
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
						<select
							name='planets'
							id='planets'
							value={location}
							onChange={(e) => setLocation(e.target.value)}>
							<option value='select'>Select Location</option>
							{planets.map((planet, index) => {
								return (
									<option key={index} value={planet.name}>
										{planet.name}
									</option>
								);
							})}
							{/* <option value='xenos-prime'>Xenos Prime</option> */}
						</select>
						<div className='mb-3'>
							<button>SIGN UP</button>
						</div>
					</form>
					<div className=''>
						<span>Already a User. Login Below</span>
						<button className={styles.signupButtonLogin}>LOG IN</button>
					</div>
				</div>
				<div className={`${styles.signupBottomdiv} mt-2`}></div>
			</div>
		</div>
	);
};

export default Signup;
