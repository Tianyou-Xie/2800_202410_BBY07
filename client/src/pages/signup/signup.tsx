import { useState, useEffect } from 'react';
import styles from './signup.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import { api } from '../../lib/axios';
import { Auth } from '../../lib/auth';

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
			const { data: res } = await api.get('/planet');
			try {
				setPlanets(res.value);
				setLocation(res.value[0]._id);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPlanets();
	}, []);

	const submitForm = async (e: any) => {
		e.preventDefault();

		const geoLoc = await new Promise<GeolocationPosition | undefined>((res) => {
			navigator.geolocation.getCurrentPosition(
				(p) => res(p),
				() => res(undefined),
			);
		});

		const newUser = {
			email: email,
			userName: username,
			password: password,
			location: {
				latitude: geoLoc ? geoLoc.coords.latitude : 0,
				longitude: geoLoc ? geoLoc.coords.longitude : 0,
				planetId: location,
			},
		};

		console.log(newUser);

		try {
			const { data: res } = await api.post('/user/signup', newUser);
			const token = res.value;
			Auth.saveToken(token);
			setLocation('/');
		} catch (err) {
			console.log(err);
			alert('Failed');
		}

		// if (!res.success) throw res.error;
		// else alert('new user created');
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
							required
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							name='email'
							placeholder='EMAIL'
							type='email'
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							name='password'
							placeholder='********'
							type='password'
							value={password}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<select
							name='planets'
							id='planets'
							defaultValue={planets[0]?._id}
							required
							onChange={(e) => setLocation(e.target.value)}>
							{planets.map((planet, index) => {
								return (
									<option key={index} value={planet._id}>
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
