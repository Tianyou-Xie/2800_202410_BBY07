/* Stylesheet import */
import styles from './edit-profile-page.module.css';

/* Imports from React */
import { useContext, useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { toast } from 'react-toastify';

/* Import custom components that were made */
import Page from '../../components/page/page';
import UIBox from '../../components/kebabui-box/kebabui-box';
import { SmallLoader } from '../../components/loader/small-loader';

/* Frontend utility imports */
import { UserAuthContext } from '../../lib/auth';
import { api } from '../../lib/axios';

const EditProfilePage = () => {
	// fetches the info of the user logged in
	const user = useContext(UserAuthContext);

	// Indicates if the image is uploading to the database
	// Responsible for showing the small loader
	const [isUploadingFile, setUploadingFile] = useState(false);

	// Reference to DOM elements
	const avatarInput = useRef<HTMLInputElement>(null);
	const undoBtn = useRef<HTMLButtonElement>(null);
	const submitBtn = useRef<HTMLButtonElement>(null);

	// stores initial info from database
	const [initBio, setInitBio] = useState(user.bio ? user.bio : '');
	const [initUsername, setInitUsername] = useState(user.userName);
	const [initAvatarURl, setInitAvatarURl] = useState(user.avatarUrl);

	// stores current changes
	const [userAvatarUrl, setAvatarUrl] = useState(initAvatarURl);
	const [userName, setUserName] = useState(initUsername);
	const [userBio, setBio] = useState(initBio);

	// Stores the previous changes
	const [prevBio, setPrevBio] = useState(initBio);
	const [prevUsername, setPrevUsername] = useState(initUsername);

	/**
	 * Listens to changes in the userName, userBio, and userAvatarUrl and calls handleBtns.
	 */
	useEffect(() => {
		handleBtns();
	}, [userName, userBio, userAvatarUrl]);

	/**
	 * Manages the functionality of the hidden file input element externally
	 */
	const triggerAvatarInput = () => {
		if (!avatarInput.current) return;
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
		console.log('here');
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

	/**
	 * Handles the toggle of the display of save and undo buttons of the page.
	 */
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

	/**
	 * Handles the user changes to save when the save button is clicked.
	 *
	 * @returns a react toast based on an error or success prompt.
	 */
	const submitChanges = async () => {
		try {
			if (userBio !== prevBio) {
				await api.patch('/user/changeBio', {
					newBio: userBio,
				});
				setPrevBio(userBio);
			} else if (userName !== prevUsername) {
				await api.patch('/user/changeUsername', {
					newUsername: userName,
				});
				setPrevUsername(userName);
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

	/**
	 * Handles undoing the recent changes when the undo button is clicked.
	 */
	const undoChanges = async () => {
		try {
			if (userBio !== initBio) {
				await api.patch('/user/changeBio', {
					newBio: initBio,
				});
				setPrevBio(initBio);
			} else if (userName !== initUsername) {
				await api.patch('/user/changeUsername', {
					newUsername: initUsername,
				});
				setPrevUsername(initUsername);
			} else if (userAvatarUrl !== initAvatarURl) {
				try {
					const { data: res } = await api.patch('/user/changeavatar', { avatarDataUrl: initAvatarURl });
					if (res.success === false) throw 'Error';
				} catch (error: any) {
					toast.error('Failed to undo avatar! Try again later.');
				}
			}
		} catch (error: any) {
			toast.error(error.response.data.error);
		}

		setAvatarUrl(initAvatarURl);
		setBio(initBio);
		setUserName(initUsername);
		undoBtn.current?.toggleAttribute('hidden', true);

		toast.success('Changes were undone.');
	};

	/**
	 * The avatar img as a JSX.Element.
	 */
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
									if (!files) return;
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

/**
 * Export for this edit profile page.
 */
export default EditProfilePage;
