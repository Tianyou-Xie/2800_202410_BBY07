import { useEffect, useState } from 'react';

import styles from './Post.module.css';

import UIBox from '../UIBox/UIBox';

// Icons
import { FaRegHeart } from 'react-icons/fa'; //<FaRegHeart />	//Empty heart
import { FaHeart } from 'react-icons/fa'; //<FaHeart />	// Filled heart
import { RiShareBoxLine } from 'react-icons/ri'; //<RiShareBoxLine />
import { FaRegBookmark } from 'react-icons/fa'; //<FaRegBookmark />	//Empty bookmark
import { FaBookmark } from 'react-icons/fa'; //<FaBookmark />	//Filled bookmark
import { FaRocketchat } from 'react-icons/fa'; //<FaRocketchat />
import { Link, useLocation } from 'wouter';
import { api } from '../../lib/axios';
import { Else, If, Then } from 'react-if';
import { GoCrossReference } from 'react-icons/go';

interface PostProp {
	_id: string;
	authorId: string;
	content: string;
	userName: string;
	likeCount?: number;
	commentCount?: number;
	createdAt?: Date;
	isRoot?: boolean;
	location?: {
		planetId: string;
		latitude: number;
		longitude: number;
		_id: string;
	};
	// media?: Array<Object>;
}

interface UserProp {
	username?: string;
	userId: string;
	imageURL?: string;
	createdAt?: Date;
}

const dateFmt = Intl.DateTimeFormat(['en-us'], { month: 'long', day: 'numeric' });

/**
 * Component representing the user part of the post (image and username).
 *
 * @param props.username - Username of the author of the post (got from the Post's props).
 * @param props.userId - Links to the user's profile page.
 * @param props.imageURL - (TODO) (Optional) Will represent the user's profile pictures as an URL or image file.
 */
const User = (props: UserProp): JSX.Element => {
	return (
		<>
			<div className='d-flex gap-2 align-items-center'>
				<UIBox
					className={styles.userContainer}
					curved
					dark
					content={
						<Link href={'/user/' + props.userId ?? '/'} className={styles.link}>
							<If condition={props.username}>
								<Then>@{props.username}</Then>
								<Else>Loading...</Else>
							</If>
						</Link>
					}
				/>

				<If condition={!!props.createdAt}>
					<Then>
						<small className='text-muted'>
							{props.createdAt ? dateFmt.format(new Date(props.createdAt!)) : ''}
						</small>
					</Then>
				</If>
			</div>
		</>
	);
};

/**
 * Post component representing the thumbnail post of an user.
 *
 * @param props.authorId string - ID of the author of the post.
 * @param props.content string - Text of the post.
 * @param props.postId string - Id of the post in the database.
 * @param props.likeCount number - Number of likes of the post.
 * @param props.commentCount number - Number of comments of the post.
 * @param props.createdAt Date - (optional) Date in which the post was created.
 * @param props.Location LocationOject - Location in which the post was created. (planetId: string, latitude: number, longitude: number, _id: string)
 * @param props.text string - Text of the post
 * @param props.postId string - URL of the complete version of the post with comments and more information
 * @param props.createdAt Date - (optional) Date in which the post was created
 */
const Post = (props: PostProp): JSX.Element => {
	const [routerPath, navigate] = useLocation();

	const [saved, setSaved] = useState(false);
	const [parentPost, setParentPost] = useState<PostProp>();

	const detailsUrl = `/post/${props._id}`;
	useEffect(() => {
		const fetchSaveStatus = async () => {
			try {
				const response = await api.get(`/post/${props._id}/save`);
				if (response.data.success) setSaved(response.data.value);
			} catch (error) {
				console.error('Error fetching save status:', error);
			}
		};

		fetchSaveStatus();
	}, []);

	useEffect(() => {
		if (props.isRoot !== false) return;

		const getParentPost = async () => {
			try {
				const res = await api.get(`/post/${props._id}/parent`).then((res) => res.data);
				if (!res.value) return;
				setParentPost(res.value);
			} catch {}
		};

		getParentPost();
	}, [props.isRoot]);

	const onBookmark = async () => {
		try {
			if (saved) {
				await api.delete(`/post/${props._id}/save`);
				setSaved(false);
			} else {
				const response = await api.post(`/post/${props._id}/save`);
				if (response.data.success) {
					setSaved(true);
				}
			}
		} catch (error) {
			console.error('Error updating save status:', error);
		}
	};

	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(props.likeCount ?? 0);
	useEffect(() => {
		const fetchLikeStatus = async () => {
			try {
				const response = await api.get(`/post/${props._id}/like`);
				setLiked(response.data.value);
			} catch (error) {
				console.error('Error fetching like status:', error);
			}
		};

		fetchLikeStatus();
	}, []);

	const onLike = async () => {
		try {
			if (liked) {
				await api.delete(`/post/${props._id}/like`);
				setLikeCount(likeCount - 1);
				setLiked(false);
			} else {
				const response = await api.post(`/post/${props._id}/like`);
				if (response.data.success) {
					setLikeCount(likeCount + 1);
					setLiked(true);
				}
			}
		} catch (error) {
			console.error('Error updating like status:', error);
		}
	};

	function onShare() {
		const shareUrl = location.origin + detailsUrl;
		navigator.share({ url: shareUrl, title: `Post by ${props.userName}`, text: `Post by ${props.userName}` });
	}

	const viewDetails = () => {
		if (routerPath === detailsUrl) return;
		navigate(detailsUrl);
	};

	return (
		<div className={styles.postContainer}>
			<User username={props.userName} userId={props.authorId} createdAt={props.createdAt} />
			<UIBox
				className='p-2'
				curved
				content={
					<>
						<If condition={!!parentPost}>
							<Then>
								<button
									className='d-flex align-items-center gap-2'
									onClick={() => navigate(`/post/${parentPost?._id}`)}>
									<GoCrossReference />
									<div className='d-flex text-wrap text-break'>
										<span>Reply of "</span>
										<span className='text-truncate' style={{ maxWidth: '2.5rem' }}>
											{parentPost?.content}
										</span>
										<span>" by {parentPost?.userName}</span>
									</div>
								</button>
								<hr className='m-0' />
							</Then>
						</If>

						<button onClick={viewDetails} className='p-2'>
							<p className='text-start text-break'>{props.content}</p>
						</button>

						<div className='d-flex flex-column'>
							<hr className='w-100 m-0' />

							<div className='d-flex gap-3 pe-3'>
								<button className='me-auto' onClick={onShare}>
									<RiShareBoxLine />
								</button>

								<div className='vr'></div>
								<button className={styles.book}>
									{saved ? (
										<FaBookmark onClick={onBookmark} />
									) : (
										<FaRegBookmark onClick={onBookmark} />
									)}
								</button>

								<div className='vr'></div>
								<div>
									<button className={styles.comment} onClick={viewDetails}>
										<FaRocketchat />
									</button>
									<small className=''>{props.commentCount}</small>
								</div>

								<div className='vr'></div>
								<div>
									<button onClick={onLike} className={styles.like}>
										{liked ? <FaHeart /> : <FaRegHeart />}
									</button>
									<small>{likeCount}</small>
								</div>
							</div>

							<hr className='w-100 m-0' />
						</div>
					</>
				}
			/>
		</div>
	);
};

export default Post;
