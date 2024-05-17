import './resetpassword.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import React, {useState} from 'react';
import { api } from '../../lib/axios';

interface Props {
    token: string;
}

const Resetpassword: React.FC<Props> = ({ token }) => {
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await api.patch(`/user/resetpassword/${token}`, {
                password,
                confirmpassword
            });
            setMessage(response.data.message);
            if (response.data.message === 'Password has been reset successfully.') {
                setResetSuccess(true);
            }
        } catch (error: any) {
            setMessage(error.response.data.message);
        }
    };

	return (
		<div className='resetpassword-container'>
			<div className='px-4 pb-2 text-center'>
				<img className='img-fluid' src={logoUrl} alt='Skynet Logo' />
				<h1>RESET YOUR PASSWORD</h1>
				<div className='resetpassword-upperdiv mb-1'></div>
				<div className='resetpassword-form'>
					<form onSubmit={handleSubmit}>
					<input
                            name='password'
                            placeholder='New Password'
                            type='password'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <br />
                        <input
                            name='confirmpassword'
                            placeholder='Confirm New Password'
                            type='password'
                            value={confirmpassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                        <br />
                        <div className='text-center'>
                            <button type="submit">Reset Password</button>
                        </div>
                    </form>
				</div>
				<div className='resetpassword-bottomdiv mt-2'></div>
				<br />
				<div className='message'>
                    {message}
                    {resetSuccess && (
                        <span className='message'>
                            {' '}
                            Let's{' '}
                            <a href='/login' onClick={() => setResetSuccess(false)}>
                                log in
                            </a>
                        </span>
                    )}
                    </div>
			</div>
		</div>
	);
};

export default Resetpassword;
