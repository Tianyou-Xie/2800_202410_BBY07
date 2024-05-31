import { FaVideo } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { IoArrowBackCircle } from 'react-icons/io5';
import { IoSend } from 'react-icons/io5';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { Else, If, Then } from 'react-if';

import styles from './messages.module.css';

const MessagesHtml = ({
	message,
	messages,
	setMessage,
	submitForm,
	id,
	isChat,
	username,
	avatar,
}:
any) => {
	function handlePageReturn() {
		history.back();
	}
	return (
		<>
			<div className={`container`}>
				<header className='border-bottom lh-1 py-3'>
					<div className='row flex-nowrap justify-content-between align-items-center'>
						<div className='col-4 pt-1'>
							<IoArrowBackCircle style={{ color: '#2196F3' }} size={40} onClick={handlePageReturn} />
						</div>
						<div className='col-4 text-center'>
							<a
								className='blog-header-logo text-body-emphasis text-decoration-none'
								href={`/user/${id}`}>
								<img src={avatar} width='80' className='rounded-circle' />
								<h3 className={styles.h3}>{username}</h3>
							</a>
						</div>
						<div className='col-4 d-flex justify-content-end align-items-center'>
							{/* <FaVideo size={20} />
							<IoCall size={20} /> */}
						</div>
					</div>
				</header>

				<main className='container mt-4 mb-5'>
					<div className='pb-5'>
						{isChat ? (
							<div>
								{messages.map((messageGroup: any) => (
									<div key={messageGroup._id}>
										<p className='fw-bold mt-4 text-center'>
											{Intl.DateTimeFormat('en-US', {
												timeZone: 'America/Vancouver',
												weekday: 'short',
												month: 'short',
												day: 'numeric',
											}).format(new Date(messageGroup._id + 'T00:00:00'))}
										</p>
										{messageGroup.messages.map((message: any, index: any) => (
											<div key={index}>
												<If condition={id === message.senderId}>
													<Then>
														<div className={`${styles.message} ${styles.receiver}`}>
															<div className={`${styles.content} ${styles.p}`}>
																{message.content}
															</div>
															<span className={`${styles.timestamp} ms-1`}>
																{new Date(message.createdAt).toLocaleTimeString(
																	'en-US',
																)}
															</span>
														</div>
													</Then>
													<Else>
														<div className={`${styles.message} ${styles.sender}`}>
															<div className={`${styles.content} ${styles.p}`}>
																{message.content}
															</div>
															<span className={`${styles.timestamp} me-1`}>
																{new Date(message.createdAt).toLocaleTimeString(
																	'en-US',
																)}
															</span>
														</div>
													</Else>
												</If>
											</div>
										))}
									</div>
								))}
							</div>
						) : (
							/* messages.map((message: any, index: number) => {
								return (
                                    <div key={index}>
                                        <If condition={id === message.senderId}>
										<Then>
											<div className={`${styles.message} ${styles.receiver}`}>
												<div className={`${styles.content} ${styles.p}`}>{message.content}</div>
												<span className={`${styles.timestamp} ms-1`}>
													{new Date(message.createdAt).toLocaleTimeString('en-US')}
												</span>
											</div>
										</Then>
										<Else>
											<div className={`${styles.message} ${styles.sender}`}>
												<div className={`${styles.content} ${styles.p}`}>{message.content}</div>
												<span className={`${styles.timestamp} me-1`}>
													{new Date(message.createdAt).toLocaleTimeString('en-US')}
												</span>
											</div>
										</Else>
									</If>
                                    </div>	
								);
							}) */
							<div className='d-flex text-body-secondary'>
								<p>No Messages to Show</p>
							</div>
						)}
					</div>
				</main>

				<div className={`container fixed-bottom pb-2 mt-5 ${styles.fixedBottom}`}>
					<div className='row align-items-center'>
						{/* <div className={`col-1 themed-grid-col ${styles.customCol}`}>
							<MdOutlineEmojiEmotions style={{ color: '#2196F3' }} size={40} />
						</div> */}
						<div className={`col-11 themed-grid-col ${styles.customCol11}`}>
							<form onSubmit={submitForm}>
								<input
									type='text'
									className={`form-control form-control-lg ${styles.input}`}
									id='address'
									placeholder='type here'
									required
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
							</form>
						</div>
						<div className={`col-1 themed-grid-col ${styles.customCol}`}>
							<IoSend style={{ color: '#2196F3' }} size={40} onClick={submitForm} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MessagesHtml;
