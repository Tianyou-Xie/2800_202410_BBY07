import styles from './resetpassword.module.css';
import logoUrl from '../../assets/images/SkynetLogo.png';
import React, { useState } from 'react';
import { api } from '../../lib/axios';
import Page from '../../components/Page/Page';

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
            setMessage(error.response.data.error);
        }
    };

    return (
        <Page
            pageName={'Reset Password'}
            content={
                <div className={styles.resetpasswordContainer}>
                    <div className='px-4 pb-2 text-center'>
                        <img className={`${styles.img} img-fluid`} src={logoUrl} alt='Skynet Logo' />
                        <h1 className={styles.h1}>RESET PASSWORD</h1>
                        <div className={`${styles.resetpasswordUpperdiv} mb-1'`}></div>
                        <div className={styles.resetpasswordForm}>
                            <form onSubmit={handleSubmit}>
                                <input
                                    name='password'
                                    placeholder='New Password'
                                    type='password'
                                    className={styles.input}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <br />
                                <input
                                    name='confirmpassword'
                                    placeholder='Confirm Password'
                                    type='password'
                                    className={styles.input}
                                    value={confirmpassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                />
                                <br />
                                <div className={`text-center`}>
                                    <button className={`${styles.button}`} type="submit">RESET PASSWORD</button>
                                </div>
                            </form>
                        </div>
                        <div className={`${styles.resetpasswordBottomdiv} mt-2`}></div>
                        <br />
                        <div className={styles.message}>
                            {message}
                            {resetSuccess && (
                                <span className={styles.message}>
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
            }
        />
    );
};

export default Resetpassword;
