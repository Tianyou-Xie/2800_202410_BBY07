import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'wouter';
import { api } from '../../lib/axios';
import { Auth } from '../../lib/auth';
import SignupHtml from './signup-html';

/**
 * Signup component handles user registration.
 *
 * @component 
 */
const Signup = () => {
	interface Planet {
		_id: string; //The ID of the planet.
		name: string; //The name of the planet.
	}

	const [loading, setLoading] = useState(false);
	const [planets, setPlanets] = useState<Array<Planet>>([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [location, setLocation] = useState('');
	const [_, navigate] = useLocation();

    /**
	 * Fetches the list of planets from the API.
	 *
	 * @function fetchPlanets
	 * @returns {Promise<void>} - A promise that resolves when the planets are fetched and state is updated.
	 */
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

    /**
	 * Handles form submission for user signup.
	 *
	 * @function submitForm
	 * @param {Object} e - The event object from the form submission.
	 * @returns {Promise<void>} - A promise that resolves when the form is submitted and response is handled.
	 */
	const submitForm = async (e: any) => {
		setLoading(true);
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

		try {
			const { data: res } = await api.post('/user/signup', newUser);
			const token = res.value;
			Auth.saveToken(token);
			navigate('/');
			toast.success('Account created successfully.');
		} catch (err: any) {
			toast.error(err.response.data.error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SignupHtml
			planets={planets}
			username={username}
			email={email}
			password={password}
			location={location}
			setPlanets={setPlanets}
			setUsername={setUsername}
			setEmail={setEmail}
			setPassword={setPassword}
			setLocation={setLocation}
			submitForm={submitForm}
			loading={loading}
		/>
	);
};

export default Signup;
