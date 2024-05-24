import { useState } from 'react';

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

	function onShare() {}

	function onBookmark() {
		setBookmarked(!bookmarked);
	}

	function onComment() {}

	function onLike() {
		setLiked(!liked);
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
									<FaBookmark onClick={onBookmark} />
								) : (
									<FaRegBookmark onClick={onBookmark} />
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
