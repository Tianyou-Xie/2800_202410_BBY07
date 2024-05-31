/* Stylesheet imports */
import styles from './Post.module.css';

/* Import from React */
import { useEffect, useState } from 'react';
import { If, Then } from 'react-if';

/* Import from wouter */
import { useLocation } from 'wouter';

/* Import from UI components */
import UIBox from '../UIBox/UIBox';

/* Import from React Icons */
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import { FaRocketchat } from 'react-icons/fa';
import { GoCrossReference } from 'react-icons/go';

/* Imports for frontend api call and authentication verification */
import { api } from '../../lib/axios';

/* Import from other components created */
import { PostHeader } from './post-header/post-header';

/* Define the PostProp interface */
interface PostProp {
	_id: string;
	authorId: string;
	content: string;
	userName: string;
	likeCount?: number;
	commentCount?: number;
	createdAt?: Date;
	displayTime?: boolean;
	parentPost?: string;
	avatarUrl?: string;
	deleted?: boolean;
	location?: {
		planetId: string;
		latitude: number;
		longitude: number;
		_id: string;
	};
	// media?: Array<Object>;
}

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

	const [isActionActive, setIsActionActive] = useState(false);

	const [saved, setSaved] = useState(false);
	const [parentPost, setParentPost] = useState<PostProp>();

	const getCacheKey = (property: string) => `${props._id}:${property}`;
	const savedCacheKey = getCacheKey('saved');
	const likedCacheKey = getCacheKey('liked');

	const detailsUrl = `/post/${props._id}`;
	useEffect(() => {
		const fetchSaveStatus = async () => {
			try {
				const response = await api.get(`/post/${props._id}/save`, { id: savedCacheKey });
				if (response.data.success) setSaved(response.data.value);
			} catch (error) {
				console.error('Error fetching save status:', error);
			}
		};

		fetchSaveStatus();
	}, []);

	useEffect(() => {
		if (props.parentPost === undefined) return setParentPost(undefined);

		const getParentPost = async () => {
			try {
				const res = await api.get(`/post/${props.parentPost}`).then((res) => res.data);
				if (!res.value) return;
				setParentPost(res.value);
			} catch { }
		};

		getParentPost();
	}, [props.parentPost]);

	const onBookmark = async () => {
		if (isActionActive) return;
		setIsActionActive(true);

		const url = `/post/${props._id}/save`;

		try {
			if (saved) {
				await api.delete(url, { cache: { update: { [savedCacheKey]: 'delete' } } });
				setSaved(false);
			} else {
				await api.post(url, undefined, { cache: { update: { [savedCacheKey]: 'delete' } } });
				setSaved(true);
			}
		} catch (error) {
			console.error('Error updating save status:', error);
		} finally {
			setIsActionActive(false);
		}
	};

	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(props.likeCount ?? 0);
	useEffect(() => {
		const fetchLikeStatus = async () => {
			try {
				const response = await api.get(`/post/${props._id}/like`, { id: likedCacheKey });
				setLiked(response.data.value);
			} catch (error) {
				console.error('Error fetching like status:', error);
			}
		};

		fetchLikeStatus();
	}, []);

	const onLike = async () => {
		if (isActionActive) return;
		setIsActionActive(true);

		const url = `/post/${props._id}/like`;

		try {
			if (liked) {
				await api.delete(url, { cache: { update: { [likedCacheKey]: 'delete' } } });
				setLikeCount(likeCount - 1);
				setLiked(false);
			} else {
				await api.post(url, undefined, { cache: { update: { [likedCacheKey]: 'delete' } } });
				setLikeCount(likeCount + 1);
				setLiked(true);
			}
		} catch (error) {
			console.error('Error updating like status:', error);
		} finally {
			setIsActionActive(false);
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
			<PostHeader {...props} />

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
										{parentPost?.deleted ? (
											<span className='text-danger'>Reply of a deleted post</span>
										) : (
											<>
												<span>Reply of "</span>
												<span className='text-truncate' style={{ maxWidth: '2.5rem' }}>
													{parentPost?.content}
												</span>
												<span>" by {parentPost?.userName}</span>
											</>
										)}
									</div>
								</button>
								<hr className='m-0' />
							</Then>
						</If>

						<button onClick={viewDetails} className='p-2'>
							<p className='text-start text-break'>
								{props.deleted ? (
									<span className='text-danger'>Post was deleted by author.</span>
								) : (
									props.content
								)}
							</p>
						</button>

						<div className='d-flex flex-column'>
							<hr className='w-100 m-0' />

							<div className='d-flex gap-3 pe-3'>
								<button className='me-auto' onClick={onShare}>
									<RiShareBoxLine />
								</button>

								<div className='vr'></div>
								<button disabled={isActionActive} className={styles.book}>
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
									<button disabled={isActionActive} onClick={onLike} className={styles.like}>
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
