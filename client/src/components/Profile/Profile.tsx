import { useEffect, useState } from 'react';
import { FaCog, FaEdit } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';
import { SlUserFollow, SlUserUnfollow } from 'react-icons/sl';
import { Else, If, Then } from 'react-if';
import { Link } from 'wouter';

import { api } from '../../lib/axios';
import UIBox from '../UIBox/UIBox';
import styles from './Profile.module.css';

interface ProfileProp {
	userId: string;
	username: string;
	description?: string;
	follower: number;
	following: number;
	postCount: number;
	outsideUser?: boolean;
	className?: string;
	avatar?: string;
}

const Profile = (props: ProfileProp): JSX.Element => {
	const [isActionActive, setIsActionActive] = useState(false);
	const [followed, setFollowed] = useState(false);
	const [followerCount, setFollowerCount] = useState<number>(props.follower);

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

	return (
		<>
			<div className={`container`}>
				<div className='row d-flex justify-content-center'>
					<div className='col-md-7'>
						<div className='card text-center'>
							<UIBox
								content={
									<>
										<div className={`col-md-7 ${styles.borderRight} no-gutters`}>
											<div className='py-3'>
												<img src={props.avatar} width='210' className='rounded-circle' />
												<div className='stats'></div>
												<div className='mt-4'>
													<h4 className={styles.username}>@{props.username}</h4>
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
									<Link href='/#EDIT_PROFILE'>
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
