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
	userURL: string;
	text: string;
	postURL: string;
	createdAt?: Date;
	repost: number;
	like: number;
	comment: number;
}

interface UserProp {
	username: string;
	userURL: string;
	imageURL?: string;
}

/**
 * Component representing the user part of the post (image and username).
 *
 * @param props.username - Username of the author of the post (got from the Post's props).
 * @param props.imageURL - (TODO) Will represent the user's profile pictures as an URL or image file.
 * @param props.userURL - (TODO) Will link to the user's profile page.
 */
const User = (props: UserProp): JSX.Element => {
	return (
		<>
			<UIBox
				className={styles.userContainer}
				curved
				dark
				content={
					<Link href={props.userURL ?? '/'} className={styles.link}>
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
 * @param props.username string - Username of the author of the post
 * @param props.text string - Text of the post
 * @param props.postURL string - URL of the complete version of the post with comments and more information
 * @param props.createdAt Date - (optional) Date in which the post was created
 * @param props.repost number - Number of reposts of the post
 * @param props.like 	number - Number of likes of the post
 * @param props.comment number - Number of comments of the post
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
			<User username={props.username} userURL={props.userURL} />
			<UIBox
				className={styles.paraContainer}
				curved
				content={
					<>
						<Link href={props.postURL} className={styles.link}>
							<p>{props.text}</p>
							{props.createdAt ? (
								<p className={styles.postDate}>{props.createdAt.toLocaleString()}</p>
							) : undefined}
						</Link>
						<div className={styles.iconsContainer}>
							<p>{props.repost}</p>
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
							<p>{props.comment}</p>
							<button onClick={onLike} className={styles.like}>
								{liked ? <FaHeart /> : <FaRegHeart />}
							</button>
							<p>{props.like}</p>
						</div>
					</>
				}
			/>
		</div>
	);
};

export default Post;
