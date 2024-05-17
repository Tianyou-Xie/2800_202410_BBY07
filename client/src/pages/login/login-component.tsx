import { useState } from 'react';
import { api } from '../../lib/axios';
import { useLocation } from 'wouter';
import { toast } from 'react-toastify';
import { Auth } from '../../lib/auth';
import LoginHtml from './login-html';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [_, setLocation] = useLocation();

	const submitForm = async (e: any) => {
		e.preventDefault();

		const newUser = {
			email: email,
			password: password,
		};

		const apiUrl = import.meta.env.VITE_LOCALHOST + '/user/login';
		try {
			const { data: res } = await api.post(apiUrl, newUser);
			if (res.success !== true || !res.value) throw 'Invalid password';

			const token = res.value;
			Auth.saveToken(token);
			setLocation('/');
			toast.success('login successfully');
		} catch (error: any) {
			let err = error.response.data.success;
			console.log(err);
			toast.error('🦄 Wrong Credentials', {
				position: 'top-right',
				autoClose: 55000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}
	};

	return (
		<LoginHtml
			email={email}
			password={password}
			setEmail={setEmail}
			setPassword={setPassword}
			submitForm={submitForm}
		/>
	);
};

export default Login;
