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
    const initBio = user.bio;
    const initUsername = user.userName;
    const initAvatarURl = user.avatarUrl;

	const [isUploadingFile, setUploadingFile] = useState(false);
	const avatarInput = useRef<HTMLInputElement>(null);
    const undoBtn = useRef<HTMLButtonElement>(null);

	const [currAvatarUrl, setAvatarUrl] = useState(initAvatarURl);
	const [userNameInput, setUserName] = useState(initUsername);
	const [userBio, setBio] = useState(initBio);

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
		if (!avatarFileTypes.includes(file.type) || file.size > 3e6) {
			toast.error('Invalid file selected!');
			return;
		}
		setUploadingFile(true);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', async () => {
			const dataUrl = reader.result;
			console.log(dataUrl);
			if (!dataUrl || typeof dataUrl !== 'string') return;
			try {
				const { data: res } = await api.patch('/user/changeavatar', { avatarDataUrl: dataUrl });
				if (res.success === false) throw 'Error';
				setAvatarUrl(res.value);

				toast.success('Updated avatar! Changes may take a few minutes.');
			} catch (error: any) {
				console.log(error);
				toast.error('Failed to update avatar! Try again later.');
			} finally {
				setUploadingFile(false);
			}
		});
	};

    const onFeildChange = (data: string, callback: (d: string) => void) => {
        callback(data);
        displayUndoBtn();
    }

    const displayUndoBtn = () => {
    }

    const submitChanges = async () => {
        try {
			const nameRes = await api.patch('/user/changeUsername', {
				newUsername: userNameInput,
			});
            const bioRes = await api.patch('/user/changeUsername', {
				newUsername: userNameInput,
			});
			toast.success("Your info has been updated!");
		} catch (error: any) {
			toast.error(error.response.data.error);
		}
    }
 
    const undoChanges = () => {
        if (userBio !== initBio) {

        }
    }

	const avatarImgElement = (
		<img src={currAvatarUrl} width='210' className='rounded-circle img-fluid border border-dark-subtle shadow' />
	);

	return (
		<>
			<Page
				pageName='Edit Profile'
				content={
					<>
						<div className={`${styles.pageContainer} w-100`}>
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
											<SmallLoader style={{ color: 'black' }} />
										</Then>
										<Else>Change Avatar</Else>
									</If>
								</button>
							</div>
							<UIBox
								className='mt-3 p-3 w-75 mx-auto'
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
													value={userNameInput}
													onChange={(event) => setUserName(event.target.value)}
												/>
											}
										/>
									</div>
								}
							/>
							<UIBox
								className='mt-3 p-3 w-75 mx-auto'
								curved
								content={
									<div>
										<label className={styles.feildLabel} htmlFor='name-input'>
											Bio
										</label>
										<UIBox
											dark
											content={
												<textarea
													id='name-input'
													placeholder='Nothing yet...'
													className={styles.textFeild}
													value={userBio}
													onChange={(event) => onFeildChange(event.target.value, setBio)}
												/>
											}
										/>
									</div>
								}
							/>
						</div>
						<div className='w-50 d-flex justify-content-evenly align-items-center'>
							<button className={`${styles.submitBtn} btn btn-primary`} onClick={submitChanges}>Submit</button>
							<button className={`${styles.undoBtn} btn btn-danger`} ref={undoBtn} onClick={undoChanges}>Undo</button>
						</div>
					</>
				}
			/>
		</>
	);
};

export default EditProfilePage;
