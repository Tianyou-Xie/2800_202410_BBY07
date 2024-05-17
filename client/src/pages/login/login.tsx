// import { useState, useEffect } from 'react';
// import styles from './login.module.css';
// import logoUrl from '../../assets/images/SkynetLogo.png';

// const Login = () => {
// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');

// 	const submitForm = async (e: any) => {
// 		e.preventDefault();

// 		const newUser = {
// 			email: email,
// 			password: password,
// 		};

// 		console.log(newUser);

// 		const apiUrl = import.meta.env.VITE_DEV + '/user/login';
// 		try {
// 			const res = await fetch(apiUrl, {
// 				method: 'POST',
// 				headers: { 'Content-Type': 'application/json' },
// 				body: JSON.stringify(newUser),
// 			});
// 			const data = await res.json();
// 			alert('logged in successfully');
// 		} catch (error) {
// 			alert('Error: check console');
// 			console.log(error);
// 		}
// 	};

// 	return (
// 		<div className={styles.loginContainer}>
// 			<div className='px-4 text-center'>
// 				<img className='img-fluid' src={logoUrl} alt='Skynet Logo' />
// 				<h1>SKY.NET</h1>
// 				<h5>STAY CONNECTED ACROSS THE GALAXY</h5>
// 				<div className={`${styles.loginUpperdiv} mb-1`}></div>
// 				<div className={styles.loginForm}>
// 					<form onSubmit={submitForm}>
// 						<input
// 							name='email'
// 							placeholder='EMAIL'
// 							type='email'
// 							value={email}
// 							onChange={(e) => setEmail(e.target.value)}
// 						/>
// 						<input
// 							name='password'
// 							placeholder='********'
// 							type='password'
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 						/>
// 						<div className='mb-3'>
// 							<button>LOGIN</button>
// 						</div>
// 					</form>
// 					<div className=''>
// 						<span>New User? Signup Below</span>
// 						<button className={styles.loginButtonLogin}>SIGN UP</button>
// 					</div>
// 				</div>
// 				<div className={`${styles.loginBottomdiv} mt-2`}></div>
// 			</div>
// 		</div>
// 	);
// };

// export default Login;


import { useState } from 'react';
import { api } from '../../lib/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await api.post('/user/login', {
                email,
                password
            });
            setMessage(response.data.message);
            // Redirect or perform any other action upon successful login
        } catch (error: any) {
            setMessage(error.response.data.error);
        }
    };
	return (
        <div className='login-container'>
            <div className='px-4 pb-2 text-center'>
                <h1>Login</h1>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <input
                            name='email'
                            placeholder='Email'
                            type='email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <br />
                        <input
                            name='password'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <br />
                        <div className='text-center'>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
                <br />
                <div className='message'>{message}</div>
            </div>
        </div>
    );
};

export default Login;