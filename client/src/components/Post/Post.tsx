import { useEffect, useState } from 'react';

import styles from './Post.module.css';

import { Container } from 'react-bootstrap';
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
import { toast } from 'react-toastify';

interface PostProp {
	username: string;
	authorId: string;
	content: string;
	postId: string;
	likeCount?: number;
	commentCount?: number;
	repostCount?: number;
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
	username: string;
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
						{props.username}
					</Link>
				}
			/>
		</>
	);
};

/**
 * Post component representing the thumbnail post of an user.
 *
 * @param props.username string - Username of the author of the post.
 * @param props.authorId string - ID of the author of the post.
 * @param props.content string - Text of the post.
 * @param props.postId string - Id of the post in the database.
 * @param props.likeCount number - Number of likes of the post.
 * @param props.commentCount number - Number of comments of the post.
 * @param props.repostCount number - Number of reposts of the post.
 * @param props.createdAt Date - (optional) Date in which the post was created.
 * @param props.Location LocationOject - Location in which the post was created. (planetId: string, latitude: number, longitude: number, _id: string)
 */
const Post = (props: PostProp): JSX.Element => {
	const [bookmarked, setBookmarked] = useState(false);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		async function isLiked() {
			try {
				const res = await api.get(`/post/${props.postId}/like`);
				setLiked(true);
			} catch (error: any) {
				if (error.response.status == 404) setLiked(false);
				else console.log(error.response);
			}
		}
		isLiked();
	}, []);

	function onShare() {}

	async function addBookMark() {
		setBookmarked(true);
		try {
			await api.post(`/post/${props.postId}/save`);
		} catch (error: any) {
			toast.error('Could not save post, it may have been removed.');
		}
	}

	async function removeBookMark() {
		setBookmarked(false);
		try {
			await api.delete(`/post/${props.postId}/save`);
		} catch (error: any) {
			// need a better error message here
			// backend does not handle the case of unsaving a post that was deleted. Backend needs to be adjusted.
			toast.error(error.response.data.error);
		}
	}

	function onComment() {}

	async function onLike() {
		try {
			const res = await api.post(`/post/${props.postId}/like`);
			console.log(res.data);
			setLiked(true);
		} catch (likeError: any) {
			if (likeError.response.status == 400) {
				console.log(likeError);
				try {
					const response = await api.delete(`/post/${props.postId}/like`);
					console.log(response.data);
					setLiked(false);
				} catch (dislikeError: any) {
					toast.error(dislikeError.response.data.error);
				}
			} else toast.error(likeError.response.data.error);
		}
	}

	return (
		<div className={styles.postContainer}>
			<User username={'@' + props.username} userId={props.authorId} />
			<UIBox
				className={styles.paraContainer}
				curved
				content={
					<>
						<Link href={'/post/' + props.postId} className={styles.link}>
							<p>{props.content}</p>
							{props.createdAt ? (
								<p className={styles.postDate}>{props.createdAt.toLocaleDateString()}</p>
							) : undefined}
						</Link>
						<div className={styles.iconsContainer}>
							<button className={styles.share}>
								<RiShareBoxLine />
							</button>
							<button className={styles.book}>
								{bookmarked ? (
									<FaBookmark onClick={removeBookMark} />
								) : (
									<FaRegBookmark onClick={addBookMark} />
								)}
							</button>
							<button className={styles.comment}>
								<FaRocketchat />
							</button>
							<button onClick={onLike} className={styles.like}>
								{liked ? <FaHeart /> : <FaRegHeart />}
							</button>
						</div>
					</>
				}
			/>
		</div>
	);
};

export default Post;
