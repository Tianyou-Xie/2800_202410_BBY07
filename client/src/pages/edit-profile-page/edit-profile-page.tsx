/* Stylesheet import */
import styles from './edit-profile-page.module.css';

/* Import custom components that were made */
import Page from '../../components/Page/Page';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserAuthContext } from '../../lib/auth';
import UIBox from '../../components/UIBox/UIBox';
import { toast } from 'react-toastify';
import { api } from '../../lib/axios';
import { Else, If, Then } from 'react-if';
import { SmallLoader } from '../../components/loader/small-loader';

const EditProfilePage = () => {
	const user = useContext(UserAuthContext);

	const [isUploadingFile, setUploadingFile] = useState(false);
	const avatarInput = useRef<HTMLInputElement>(null);
	const undoBtn = useRef<HTMLButtonElement>(null);
	const submitBtn = useRef<HTMLButtonElement>(null);

	const [initBio, setInitBio] = useState(user.bio ? user.bio : '');
	const [initUsername, setInitUsername] = useState(user.userName);
	const [initAvatarURl, setInitAvatarURl] = useState(user.avatarUrl);

	const [userAvatarUrl, setAvatarUrl] = useState(initAvatarURl);
	const [userName, setUserName] = useState(initUsername);
	const [userBio, setBio] = useState(initBio);

	const [currBio, setCurrBio] = useState(initBio);
	const [currUsername, setCurrUsername] = useState(initUsername);

	useEffect(() => {
		handleBtns();
	}, [userName, userBio, userAvatarUrl]);

	/**
	 * Manages the functionality of the hidden file input element externally
	 */
	const triggerAvatarInput = () => {
		console.log("here1");
		if (!avatarInput.current) return;
		console.log("here2");
		avatarInput.current.click();
	};

	const avatarFileTypes = ['image/png', 'image/jpeg', 'image/webp'];

	/**
	 * Handles the patch request to upload the new avatar image URL. Throws an error if unsuccesful or invalid file id provided.
	 *
	 * Original process was coded by Zyrakia from slient/src/pages/profile/profile.tsx
	 * This function was just extracted for a particular use Most credit goes to Zyrakia.
	 *
	 * @param file the file submited by the user
	 * @author Zyrakia & SamarjitBhogal
	 */
	const uploadAvatar = async (file: File) => {
		console.log("here");
		if (!avatarFileTypes.includes(file.type) || file.size > 3e6) {
			toast.error('Invalid file selected!');
			return;
		}
		setUploadingFile(true);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', async () => {
			const dataUrl = reader.result;
			if (!dataUrl || typeof dataUrl !== 'string') return;
			try {
				const { data: res } = await api.patch('/user/changeavatar', { avatarDataUrl: dataUrl });
				if (res.success === false) throw 'Error';
				setAvatarUrl(res.value);
				const undo = undoBtn.current;
				undo?.toggleAttribute('hidden', false);

				toast.success('Updated avatar! Changes may take a few minutes.');
			} catch (error: any) {
				toast.error('Failed to update avatar! Try again later.');
			} finally {
				setUploadingFile(false);
			}
		});
	};

	const handleBtns = () => {
		const undo = undoBtn.current;
		const submit = submitBtn.current;
		if (submit?.hasAttribute('disabled')) {
			submit?.removeAttribute('disabled');
		}
		if (userName == initUsername && userBio == initBio && userAvatarUrl == initAvatarURl) {
			undo?.toggleAttribute('hidden', true);
			submit?.setAttribute('disabled', 'true');
		}
	};

	const submitChanges = async () => {
		try {
			if (userBio !== currBio) {
				const bioRes = await api.patch('/user/changeBio', {
					newBio: userBio,
				});
				setCurrBio(userBio);
			} else if (userName !== currUsername) {
				const nameRes = await api.patch('/user/changeUsername', {
					newUsername: userName,
				});
				setCurrUsername(userName);
			} else {
				return toast.error('The information entered has already been saved.');
			}

			toast.success('Your info has been updated!');
		} catch (error: any) {
			toast.error(error.response.data.error);
		}

		const undo = undoBtn.current;
		undo?.toggleAttribute('hidden', false);
	};

	const undoChanges = async () => {
		if (userBio !== initBio) {
			try {
				const bioRes = await api.patch('/user/changeBio', {
					newBio: initBio,
				});
				setCurrBio(initBio);
			} catch (error: any) {
				toast.error(error.response.data.error);
			}
		}

		if (userName !== initUsername) {
			try {
				const nameRes = await api.patch('/user/changeUsername', {
					newUsername: initUsername,
				});
				setCurrUsername(initUsername);
			} catch (error: any) {
				toast.error(error.response.data.error);
			}
		}

		if (userAvatarUrl !== initAvatarURl) {
			try {
				const { data: res } = await api.patch('/user/changeavatar', { avatarDataUrl: initAvatarURl });
				if (res.success === false) throw 'Error';
			} catch (error: any) {
				toast.error('Failed to undo avatar! Try again later.');
			}
		}

		setAvatarUrl(initAvatarURl);
		setBio(initBio);
		setUserName(initUsername);
		undoBtn.current?.toggleAttribute('hidden', true);

		toast.success('Changes were undone.');
	};

	const avatarImgElement = (
		<img src={userAvatarUrl} width='210' className='rounded-circle img-fluid border border-dark-subtle shadow' />
	);

	return (
		<>
			<Page
				pageName='Edit Profile'
				content={
					<>
						<div className={`w-100`}>
							<input
								ref={avatarInput}
								onChange={(event) => {
									const files = event.target.files;
									console.log("before return")
									if (!files) return;
									console.log('after return')
									uploadAvatar(files[0]);
								}}
								type='file'
								hidden
							/>
							<button className='w-100 text-center' onClick={triggerAvatarInput}>
								{avatarImgElement}
							</button>
							<div className='w-100 d-flex justify-content-center'>
								<button className={`${styles.avatarBtn} rounded-4`} onClick={triggerAvatarInput}>
									<If condition={isUploadingFile}>
										<Then>
											<SmallLoader style={{ color: 'white' }} />
										</Then>
										<Else>Change Avatar</Else>
									</If>
								</button>
							</div>
							<UIBox
								className={`${styles.uiBox} mt-3 p-3 w-100 mx-auto`}
								curved
								content={
									<div>
										<label className={styles.feildLabel} htmlFor='name-input'>
											Username
										</label>
										<UIBox
											dark
											content={
												<input
													id='name-input'
													className={styles.textFeild}
													type='text'
													value={userName}
													onChange={(event) => setUserName(event.target.value)}
												/>
											}
										/>
									</div>
								}
							/>
							<UIBox
								className={`${styles.uiBox} mt-3 p-3 w-100 mx-auto`}
								curved
								content={
									<div>
										<label className={styles.feildLabel} htmlFor='bio-input'>
											Bio
										</label>
										<UIBox
											dark
											content={
												<textarea
													id='bio-input'
													placeholder='Nothing yet...'
													className={styles.textFeild}
													value={userBio}
													onChange={(event) => setBio(event.target.value)}
												/>
											}
										/>
									</div>
								}
							/>
						</div>
						<div className='w-50 d-flex justify-content-evenly align-items-center mb-3'>
							<button
								className={`${styles.submitBtn} btn btn-primary`}
								onClick={submitChanges}
								ref={submitBtn}>
								Save
							</button>
							<button className={`${styles.undoBtn} btn btn-danger`} ref={undoBtn} onClick={undoChanges}>
								Undo
							</button>
						</div>
					</>
				}
			/>
		</>
	);
};

export default EditProfilePage;
