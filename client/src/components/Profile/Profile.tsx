import { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import { FaCog, FaEdit } from 'react-icons/fa';
import { FaLocationDot, FaRegMessage } from 'react-icons/fa6';
import { SlUserFollow, SlUserUnfollow } from 'react-icons/sl';
import { Else, If, Then } from 'react-if';
import { Link } from 'wouter';

import { api } from '../../lib/axios';
import UIBox from '../UIBox/UIBox';
import styles from './Profile.module.css';
import { toast } from 'react-toastify';
import { SmallLoader } from '../loader/small-loader';

interface ProfileProp {
	userId: string;
	username: string;
	description?: string;
	follower: number;
	following: number;
	postCount: number;
	planetId?: string;
	createdAt?: Date;
	outsideUser?: boolean;
	className?: string;
	avatar?: string;
}

const joinedDateFmt = new Intl.DateTimeFormat(navigator.language, { month: 'long', day: 'numeric', year: 'numeric' });

const Profile = (props: ProfileProp): JSX.Element => {
	const [isActionActive, setIsActionActive] = useState(false);
	const [followed, setFollowed] = useState(false);
	const [followerCount, setFollowerCount] = useState<number>(props.follower);
	const [avatarUrl, setAvatarUrl] = useState(props.avatar);
	const [locationName, setLocationName] = useState('');

	useEffect(() => {
		const fetchSaveStatus = async () => {
			if (!props.userId) {
				return;
			}

			try {
				const response = await api.get(`/user/${props.userId}/follow`);
				if (response.data.success) {
					setFollowed(response.data.value);
					setFollowerCount(props.follower);
				}
			} catch (error) {
				console.error('Error fetching follow status:', error);
			}
		};

		fetchSaveStatus();
	}, [props.userId]);

	useEffect(() => {
		setAvatarUrl(props.avatar);
	}, [props.avatar]);

	useEffect(() => {
		const id = props.planetId;
		if (!id) return setLocationName('');

		api.get(`/planet/${id}`)
			.then(({ data: res }) => setLocationName(res.value.name))
			.catch();
	}, [props.planetId]);

	const onFollow = async () => {
		if (isActionActive) return;
		setIsActionActive(true);

		try {
			if (followed) {
				await api.delete(`/user/${props.userId}/follow`);
				setFollowed(false);
				setFollowerCount((prevCount) => Math.max(0, prevCount - 1));
			} else {
				const response = await api.post(`/user/${props.userId}/follow`);
				if (response.data.success) {
					setFollowed(true);
					setFollowerCount((prevCount) => prevCount + 1);
				}
			}
		} catch (error) {
			console.error('Error updating follow status:', error);
		} finally {
			setIsActionActive(false);
		}
	};

	const avatarFileTypes = ['image/png', 'image/jpeg', 'image/webp'];
	const changeAvatarInput = useRef<HTMLInputElement>(null);

	const initiateAvatarChange = () => {
		const input = changeAvatarInput.current;
		if (!input) return;

		input.click();
	};

	const [isUploadingFile, setUploadingFile] = useState(false);
	const changeAvatar = (imageFile: File) => {
		if (!avatarFileTypes.includes(imageFile.type) || imageFile.size > 3e6) {
			toast.error('Invalid file selected!');
			return;
		}

		if (isUploadingFile) return;
		setUploadingFile(true);

		const reader = new FileReader();
		reader.addEventListener('load', async () => {
			try {
				const dataUrl = reader.result;
				if (!dataUrl || typeof dataUrl !== 'string') return;

				const { data: res } = await api.patch('/user/changeavatar', { avatarDataUrl: dataUrl });
				if (res.success === false) throw 'Error';

				setAvatarUrl(res.value);
				toast.success('Updated avatar! Changes may take a few minutes.');
			} catch {
				toast.error('Failed to update avatar! Try again later.');
			} finally {
				setUploadingFile(false);
			}
		});

		reader.readAsDataURL(imageFile);
	};

	const avatarImgElement = (
		<img src={avatarUrl} width='210' className='rounded-circle img-fluid border border-dark-subtle shadow' />
	);

	return (
		<>
			<div className={`container`}>
				<div className='row d-flex justify-content-center'>
					{/* <div className='col-md-7'> */}
					<div className={styles.profileContainer}>
						<div className='card text-center'>
							<UIBox
								content={
									<>
										<div className={`col-md-7 ${styles.borderRight} no-gutters`}>
											<div className='py-3'>
												<If condition={!props.outsideUser}>
													<Then>
														<input
															ref={changeAvatarInput}
															type='file'
															accept={avatarFileTypes.join(',')}
															onChange={(e) => {
																const files = e.target.files;
																const img = files && files[0];
																if (!img) return;
																changeAvatar(img);
															}}
															hidden
														/>
														<button
															onClick={initiateAvatarChange}
															disabled={isUploadingFile}>
															<div className='d-flex flex-column align-items-center gap-2'>
																{avatarImgElement}
																<UIBox
																	clickable
																	curved
																	dark
																	className={`${styles.buttons} px-2`}
																	content={
																		<If condition={isUploadingFile}>
																			<Then>
																				<SmallLoader
																					style={{ color: 'white' }}
																				/>
																			</Then>

																			<Else>Change Avatar</Else>
																		</If>
																	}
																/>
															</div>
														</button>
													</Then>
													<Else>{avatarImgElement}</Else>
												</If>
												<div className='stats'></div>
												<div className='mt-2'>
													<h4 className={styles.username}>@{props.username}</h4>
												</div>
												<div className='mt-2 d-flex flex-column align-items-center'>
													<If condition={props.description}>
														<Then> {props.description}</Then>
													</If>

													<hr className='w-100 m-2' />

													<If
														condition={
															locationName !== undefined && props.createdAt !== undefined
														}>
														<Then>
															<div className='d-flex gap-2 align-items-center'>
																Joined
																<FaLocationDot />
																{locationName} on{' '}
																{props.createdAt
																	? joinedDateFmt.format(new Date(props.createdAt))
																	: ''}
															</div>
														</Then>
													</If>
												</div>
											</div>
										</div>
										<div className='col-md-5'>
											<div className='py-3'>
												<div className='mt-4'>
													<span className='d-block head'>{followerCount} followers</span>
												</div>
												<div className='mt-4'>
													<span className='d-block head'>{props.following} following</span>
												</div>
												<div className='mt-4'>
													<span className='d-block head'>{props.postCount} posts</span>
												</div>
											</div>
										</div>
									</>
								}
								className={styles.profileInfoBox}
								curved
							/>
						</div>

						<div className={`${styles.bottomButtons} justify-content-center justify-content-lg-end`}>
							{props.outsideUser ? (
								<button disabled={isActionActive} onClick={onFollow}>
									<UIBox
										className={`${styles.buttons} p-1 h-100 d-flex align-items-center`}
										content={
											<If condition={!followed}>
												<Then>
													<div className='d-flex gap-1 align-items-center'>
														<SlUserFollow />
														<span>Follow</span>
													</div>
												</Then>

												<Else>
													<div className='d-flex gap-1 align-items-center'>
														<SlUserUnfollow />
														<span>Unfollow</span>
													</div>
												</Else>
											</If>
										}
										curved
										clickable={!isActionActive}
										dark
									/>
								</button>
							) : (
								<button>
									<Link href='/profile/edit'>
										<UIBox
											className={`${styles.buttons} p-1 h-100 d-flex align-items-center`}
											content={
												<div className='d-flex gap-1 align-items-center'>
													<FaEdit />
													<span>Edit Profile</span>
												</div>
											}
											curved
											clickable
											dark
										/>
									</Link>
								</button>
							)}
							<button>
								<Link href={props.outsideUser ? '/messages/' + props.userId : '/settings'}>
									<UIBox
										className={`${styles.buttons} p-1 h-100 d-flex align-items-center`}
										content={
											<div className='d-flex gap-1 align-items-center'>
												<If condition={props.outsideUser}>
													<Then>
														<FaRegMessage />
														<span>Message</span>
													</Then>

													<Else>
														<FaCog />
														<span>Settings</span>
													</Else>
												</If>
											</div>
										}
										curved
										clickable
										dark
									/>
								</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.line}></div>
		</>
	);
};

export default Profile;
