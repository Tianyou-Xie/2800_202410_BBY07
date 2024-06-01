/* Stylesheet imports */
import styles from './kebab-post.module.css';

/* Import from React */
import { useEffect, useState } from 'react';
import { If, Then } from 'react-if';

/* Import from wouter */
import { useLocation } from 'wouter';

/* Import from UI components */
import UIBox from '../kebab-uibox/kebab-uibox';

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

/**
 * Interface that represents the arguments passed down to the Post component.
 *
 * @params Covered on the component documentation.
 */
interface PostProp {
	_id: string;
	authorId: string;
	content: string;
	userName: string;
	likeCount?: number;
	commentCount?: number;
	createdAt?: Date;
	format?: 'short' | 'expanded';
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
 * @param props._id string - Id of the post in the database.
 * @param props.authorId string - Id of the author of the post.
 * @param props.content string - Text of the post.
 * @param props.userName string - UserName of author of the post.
 * @param props.likeCount number - Number of likes of the post.
 * @param props.commentCount number - Number of comments of the post.
 * @param props.createdAt Date - (optional) Date in which the post was created.
 * @param props.format short | long - If true, displays extra information and actions about the post
 * @param props.isRoot boolean - If true, displays the post as a root post instead of as a comment post.
 * @param props.avatarUrl string - Url for displaying the avatar picture of the author of the post
 * @param props.deleted boolean - If true, displays the post as a deleted post.
 * @param props.Location LocationOject - Location in which the post was created. (planetId: string, latitude: number, longitude: number, _id: string)
 * @return JSX.Element - Post component as a JSX.Element
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

	const [format, setFormat] = useState<'short' | 'expanded'>(props.format ?? 'short');
	useEffect(() => setFormat(props.format ?? 'short'), [props.format]);

	/**
	 * Use effect used to fetch the save status of that post (if a post
	 * was already saved or not).
	 */
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

	/**
	 * Use effect used to fetch the status of that post as comment post or
	 * parent/root post and if it is a comment, fetch the parent post.
	 */
	useEffect(() => {
		if (props.parentPost === undefined) return setParentPost(undefined);

		const getParentPost = async () => {
			try {
				const res = await api.get(`/post/${props.parentPost}`).then((res) => res.data);
				if (!res.value) return;
				setParentPost(res.value);
			} catch {}
		};

		getParentPost();
	}, [props.parentPost]);

	/**
	 * Used to bookmark or unbookmark a post and send that request
	 * to the backend and database.
	 *
	 * @return void
	 */
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

	/**
	 * Use effect used to fetch the like status of that post (if a post
	 * was already liked or not).
	 */
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

	/**
	 * Used to like or dislike a post and send that request
	 * to the backend and database.
	 *
	 * @return void
	 */
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

	/**
	 * Used to open a window on the browser to allow the user to share or
	 * copy the url of the post.
	 *
	 * @return void
	 */
	function onShare() {
		const shareUrl = location.origin + detailsUrl;
		navigator.share({ url: shareUrl, title: `Post by ${props.userName}`, text: `Post by ${props.userName}` });
	}

	/**
	 * Used to redirect the user to the post detail's page of that user.
	 *
	 * @return void
	 */
	const viewDetails = () => {
		if (routerPath === detailsUrl) return;
		navigate(detailsUrl);
	};

	return (
		<div className={styles.postContainer}>
			<PostHeader {...props} format={format} />

			<UIBox
				className='p-2'
				curved
				content={
					<>
						<If condition={!!parentPost}>
							<Then>
								<button
									className='d-flex align-items-center gap-2 flex-wrap['
									onClick={() => navigate(`/post/${parentPost?._id}`)}>
									<GoCrossReference />
									<div className='text-start text-break flex-wrap'>
										{parentPost?.deleted ? (
											<span className='text-danger'>Reply of a deleted post</span>
										) : (
											<>
												Reply of "
												{(parentPost?.content.length ?? 0) < 5
													? parentPost?.content
													: parentPost?.content.slice(0, 5) + '...'}
												" by {parentPost?.userName}
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
