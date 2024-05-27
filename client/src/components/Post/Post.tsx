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
import { Link } from 'wouter';
import { api } from '../../lib/axios';
import { Else, If, Then } from 'react-if';

interface PostProp {
	authorId: string;
	content: string;
	postId: string;
	likeCount?: number;
	commentCount?: number;
	createdAt?: Date;
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
}

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
	function onShare() {}

	function onComment() {}

	const [saved, setSaved] = useState(false);

	useEffect(() => {
		const fetchSaveStatus = async () => {
			try {
				const response = await api.get(`/post/${props.postId}/save`);
				if (response.data.success) {
					setSaved(response.data.value);
				}
			} catch (error) {
				console.error('Error fetching save status:', error);
			}
		};

		fetchSaveStatus();
	}, []);

	const onBookmark = async () => {
		try {
			if (saved) {
				await api.delete(`/post/${props.postId}/save`);
				setSaved(false);
			} else {
				const response = await api.post(`/post/${props.postId}/save`);
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
				const response = await api.get(`/post/${props.postId}/like`);
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
				await api.delete(`/post/${props.postId}/like`);
				setLikeCount(likeCount - 1);
				setLiked(false);
			} else {
				const response = await api.post(`/post/${props.postId}/like`);
				if (response.data.success) {
					setLikeCount(likeCount + 1);
					setLiked(true);
				}
			}
		} catch (error) {
			console.error('Error updating like status:', error);
		}
	};

	const [authorInfo, setAuthorInfo] = useState<any>({});
	useEffect(() => {
		api.get(`/user/${props.authorId}`).then((v) => {
			setAuthorInfo(v.data.value);
		});
	}, [props.authorId]);

	return (
		<div className={styles.postContainer}>
			<User username={authorInfo.userName} userId={props.authorId} />
			<UIBox
				className={styles.paraContainer}
				curved
				content={
					<>
						<Link href={'/post/' + props.postId} className={styles.link}>
							<p>{props.content}</p>
							{props.createdAt ? (
								<p className={styles.postDate}>{new Date(props.createdAt).toLocaleString()}</p>
							) : undefined}
						</Link>
						<div className={styles.iconsContainer}>
							<button className={styles.share}>
								<RiShareBoxLine />
							</button>
							<button className={styles.book}>
								{saved ? <FaBookmark onClick={onBookmark} /> : <FaRegBookmark onClick={onBookmark} />}
							</button>
							<button className={styles.comment}>
								<FaRocketchat />
							</button>
							<p>{props.commentCount}</p>

							<button onClick={onLike} className={styles.like}>
								{liked ? <FaHeart /> : <FaRegHeart />}
							</button>
							<p>{likeCount}</p>
						</div>
					</>
				}
			/>
		</div>
	);
};

export default Post;
