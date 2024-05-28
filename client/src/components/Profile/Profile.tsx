import styles from './Profile.module.css';
import UIBox from '../UIBox/UIBox';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

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
		try {
			if (followed) {
				await api.delete(`/user/${props.userId}/follow`);
				setFollowed(false);
				setFollowerCount(prevCount => Math.max(0, prevCount - 1));
			} else {
				const response = await api.post(`/user/${props.userId}/follow`);
				if (response.data.success) {
					setFollowed(true);
					setFollowerCount(prevCount => prevCount + 1);
				}
			}
		} catch (error) {
			console.error('Error updating follow status:', error);
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
												<img
													src={props.avatar}
													width='210'
													className='rounded-circle'
												/>
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

						<div className={styles.bottomButtons}>
							{props.outsideUser ? (
								<button onClick={onFollow}>
									<UIBox
										className={styles.edit + ' ' + styles.buttons}
										content={followed ? 'Following' : 'Follow'}
										curved
										clickable
										dark
									/>
								</button>
							) : (
								<button>
									<Link href='/#EDIT_PROFILE'>
										<UIBox
											className={styles.edit + ' ' + styles.buttons}
											content='Edit profile'
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
										className={styles.settings + ' ' + styles.buttons}
										content={props.outsideUser ? 'Message' : '*'}
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
