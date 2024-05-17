import './forgetpassword.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import React, {useState} from 'react';
import { api } from '../../lib/axios';

const Forgetpassword = () => {
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.post('/user/forgetpassword', { email });
			setMessage(response.data.message);
		} catch (error: any) {
			setMessage(error.response.data.message);
		}
	};

	return (
		<div className='forgetpassword-container'>
			<div className='px-4 pb-2 text-center'>
				<img className='img-fluid' src={logoUrl} alt='Skynet Logo' />
				<h1>SKY.NET</h1>
				<h5>FORGET YOUR PASSWORD? WE ARE HERE TO HELP!</h5>
				<div className='forgetpassword-upperdiv mb-1'></div>
				<div className='forgetpassword-form'>
					<form onSubmit={handleSubmit}>
						<input 
							name='email' 
							placeholder='PLEASE ENTER YOUR EMAIL' 
							type='email'
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
						<br />
						<div className='text-center'>
							<button type="submit">SUBMIT</button>
						</div>
					</form>
				</div>
				<div className='forgetpassword-bottomdiv mt-2'></div>
				<div className='message'>{message}</div>
			</div>
		</div>
	);
};

export default Forgetpassword;
