import { useContext, useEffect, useMemo, useRef, useState } from 'react';
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
import { UserAuthContext } from '../../lib/auth';

/**
 * Interface that represents the arguments passed down to the Profile component.
 *
 * @params Covered on the component documentation.
 */
interface ProfileProp {
	_id: string;
	userName: string;
	bio?: string;
	followerCount: number;
	followingCount: number;
	postCount: number;
	location?: { planetId: string; latitude: number; longitude: number };
	createdAt?: Date;
	avatarUrl?: string;
	className?: string;
	deleted?: boolean;
}

const joinedDateFmt = new Intl.DateTimeFormat(navigator.language, { month: 'long', day: 'numeric', year: 'numeric' });

/**
 *
 * @param props._id string - Id of the user
 * @param props.userName string - Username of the user
 * @param props.bio string - (Optional) Small description given by the user.
 * @param props.followerCount number - Number of followers of the user
 * @param props.followingCount number - Number of accounts the user follows
 * @param props.postCount number - Number of posts created by the user
 * @param props.Location LocationOject - Location in which the user is from/was created at (planetId: string, latitude: number, longitude: number, _id: string)
 * @param props.createdAt Date - (optional) Date in which the user was created.
 * @param props.avatarUrl string - Url for displaying the avatar picture of the user
 * @param props.className string - String for styling.
 * @return JSX.Element - Profile component as a JSX.Element
 */
const Profile = (props: ProfileProp): JSX.Element => {
	const user = useContext(UserAuthContext);

	const [isOutsideUser, setIsOutsideUser] = useState(false);
	useEffect(() => setIsOutsideUser(props._id !== user._id), [user]);

	const [isActionActive, setIsActionActive] = useState(false);
	const [followed, setFollowed] = useState(false);
	const [followerCount, setFollowerCount] = useState(props.followerCount);
	const [avatarUrl, setAvatarUrl] = useState(props.avatarUrl);
	const [locationName, setLocationName] = useState('');

	useEffect(() => {
		const fetchSaveStatus = async () => {
			if (!props._id) {
				return;
			}

			try {
				const response = await api.get(`/user/${props._id}/follow`);
				if (response.data.success) {
					setFollowerCount(props.followerCount);
					setFollowed(response.data.value);
				}
			} catch (error) {
				console.error('Error fetching follow status:', error);
			}
		};

		fetchSaveStatus();
	}, [props._id]);

	useEffect(() => {
		setAvatarUrl(props.avatarUrl);
	}, [props.avatarUrl]);

	useEffect(() => {
		const id = props.location?.planetId;
		if (!id) return setLocationName('');

		api.get(`/planet/${id}`)
			.then(({ data: res }) => setLocationName(res.value.name))
			.catch();
	}, [props.location]);

	const onFollow = async () => {
		if (isActionActive) return;
		setIsActionActive(true);

		try {
			if (followed) {
				await api.delete(`/user/${props._id}/follow`);
				setFollowed(false);
				setFollowerCount((prevCount) => Math.max(0, prevCount - 1));
			} else {
				const response = await api.post(`/user/${props._id}/follow`);
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

	const avatarImgElement = useMemo(() => {
		if (!avatarUrl) return <></>;
		return (
			<img
				src={avatarUrl}
				style={{ maxWidth: '210px', maxHeight: '210px', aspectRatio: '1' }}
				className='rounded-circle img-fluid border border-dark-subtle shadow figure'
			/>
		);
	}, [avatarUrl]);

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
										<div className='py-3'>
											<If condition={!isOutsideUser}>
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
													<button onClick={initiateAvatarChange} disabled={isUploadingFile}>
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
																			<SmallLoader style={{ color: 'white' }} />
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
												{props.deleted ? (
													<h4 className='text-danger'>Deleted User</h4>
												) : (
													<h4 className={styles.username}>@{props.userName}</h4>
												)}
											</div>
											<div className='mt-2 d-flex flex-column align-items-center'>
												<If condition={props.bio}>
													<Then> {props.bio}</Then>
												</If>

												<hr className='w-100 m-2' />

												<If
													condition={
														locationName !== undefined && props.createdAt !== undefined
													}>
													<Then>
														<div className='d-flex flex-column flex-sm-row gap-2 align-items-center'>
															<span className='d-flex gap-2'>
																Joined from
																<span className='d-flex align-items-center gap-1'>
																	<FaLocationDot />
																	{locationName}
																</span>
															</span>
															<span className='flex-wrap'>
																on{' '}
																{props.createdAt
																	? joinedDateFmt.format(new Date(props.createdAt))
																	: ''}
															</span>
														</div>
													</Then>
												</If>

												<hr className='w-100 m-2' />
											</div>
										</div>
										<div className='pb-3 d-flex gap-2 align-items-center justify-content-evenly'>
											<span>
												{followerCount} Follower{followerCount !== 1 ? 's' : ''}
											</span>
											<div className='vr'></div>
											<span className='d-block head'>{props.followingCount} Following</span>
											<div className='vr'></div>
											<span className='d-block head'>
												{props.postCount} Post{props.postCount !== 1 ? 's' : ''}
											</span>
										</div>
									</>
								}
								className={styles.profileInfoBox}
								curved
							/>
						</div>

						<div className={`${styles.bottomButtons} justify-content-center justify-content-lg-end`}>
							{isOutsideUser ? (
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
								<Link href={isOutsideUser ? '/messages/' + props._id : '/settings'}>
									<UIBox
										className={`${styles.buttons} p-1 h-100 d-flex align-items-center`}
										content={
											<div className='d-flex gap-1 align-items-center'>
												<If condition={isOutsideUser}>
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
