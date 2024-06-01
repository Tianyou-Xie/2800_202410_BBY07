import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { useLocation, useSearch } from 'wouter';
import { toast } from 'react-toastify';
import { Auth } from '../../lib/auth';
import LoginHtml from './login-html';

/**
 * Login component handles user login functionality.
 *
 * @component
 * @returns {JSX.Element} The rendered Login component.
 */
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [_, setLocation] = useLocation();

	const [loading, setLoading] = useState(true);

    // Retrieves search query parameters from the URL
	const query = useSearch();

    /**
     * Effect hook to handle external authentication using OAuth code.
     * Fetches token from the backend and saves it on successful authentication.
     */
	useEffect(() => {
		const params = new URLSearchParams(query);
		const externalAuthCode = params.get('code');
		if (!externalAuthCode) return setLoading(false);

		Auth.fetchToken(params).then((token) => {
			if (!token) return setLoading(false);
			Auth.saveToken(token);
			setLoading(false);
			setLocation('/home');
		});
	}, []);

    /**
     * Handles form submission for user login.
     * Sends login request to the backend and handles the response.
     *
     * @param {Event} e - The form submission event.
     */
	const submitForm = async (e: any) => {
		e.preventDefault();

		const newUser = {
			email: email,
			password: password,
		};

		try {
			const { data: res } = await api.post('/user/login', newUser);
			if (res.success !== true || !res.value) throw 'Invalid password';

			const token = res.value;
			Auth.saveToken(token);
			setLocation('/home');
			toast.success('Logged in successfully.');
		} catch (error: any) {
			let err = error.response.data.success;
			toast.error('No account exists with that email and password.', {
				position: 'top-right',
				autoClose: 5500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}
	};

    // Renders the LoginHtml component with necessary props
	return (
		<LoginHtml
			email={email}
			password={password}
			setEmail={setEmail}
			setPassword={setPassword}
			submitForm={submitForm}
			loading={loading}
		/>
	);
};

export default Login;
