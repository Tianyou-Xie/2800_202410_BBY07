import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'wouter';
import { api } from '../../lib/axios';
import { Auth } from '../../lib/auth';
import SignupHtml from './signup-html';

const Signup = () => {
	interface Planet {
		_id: string;
		name: string;
	}

	const [loading, setLoading] = useState(false);
	const [planets, setPlanets] = useState<Array<Planet>>([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [location, setLocation] = useState('');
	const [_, navigate] = useLocation();

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

		try {
			const { data: res } = await api.post('/user/signup', newUser);
			const token = res.value;
			Auth.saveToken(token);
			navigate('/');
			toast.success('User created successfully');
		} catch (err: any) {
			toast.error(`🦄 ${err.response.data.error}`, {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}

		// if (!res.success) throw res.error;
		// else alert('new user created');
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
		/>
	);
};

export default Signup;
