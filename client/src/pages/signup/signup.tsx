import { useState, useEffect } from 'react';
import styles from './signup.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';

const Signup = () => {
	interface Planet {
		_id: string;
		name: string;
	}
	const [planets, setPlanets] = useState<Array<Planet>>([]);
	useEffect(() => {
		const fetchPlanets = async () => {
			const apiUrl = 'http://localhost:3000/planet';
			try {
				const res = await fetch(apiUrl);
				const data = await res.json();
				console.log(data.value);
				setPlanets(data.value);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPlanets();
	}, []);

	return (
		<div className={styles.signupContainer}>
			<div className='px-4 pb-2 text-center'>
				<img className='img-fluid' src={logoUrl} alt='Skynet Logo' />
				<h1>SKY.NET</h1>
				<h5>STAY CONNECTED ACROSS THE GALAXY</h5>
				<div className={`${styles.signupUpperdiv} mb-1`}></div>
				<div className={styles.signupForm}>
					<form>
						<input name='username' placeholder='USERNAME' type='email' />
						<input name='email' placeholder='EMAIL' type='email' />
						<input name='password' placeholder='********' type='password' />
						<select name='planets' id='planets'>
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
					</form>
					<div className='text-center'>
						<button>LOG IN</button>
						<button>SIGN UP</button>
					</div>
				</div>
				<div className={`${styles.signupBottomdiv} mt-2`}></div>
			</div>
		</div>
	);
};

export default Signup;
