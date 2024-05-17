import { useState } from 'react';

import styles from './Post.module.css';

import Container from 'react-bootstrap/Container';
import Para from '../para/Para';

// Icons
import { FaRegHeart } from 'react-icons/fa'; //<FaRegHeart />	//Empty heart
import { FaHeart } from 'react-icons/fa'; //<FaHeart />	// Filled heart
import { RiShareBoxLine } from "react-icons/ri"; //<RiShareBoxLine />
import { FaRegBookmark } from "react-icons/fa"; //<FaRegBookmark />	//Empty bookmark
import { FaBookmark } from 'react-icons/fa'; //<FaBookmark />	//Filled bookmark
import { FaRocketchat } from 'react-icons/fa'; //<FaRocketchat />

interface PostProp {
	username: string;
	userURL: string;
	text: string;
	postURL: string;
	createdAt?: Date;
}

interface UserProp {
	username: string;
	userURL: string;
	imageURL? : string;
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
			<Container className={styles.userContainer}>
				<a href={props.userURL} style={{ textDecoration: 'none', color: 'inherit' }}>
					{props.username}
				</a>
			</Container>
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
 */
const Post = (props: PostProp): JSX.Element => {
	const [bookmarked, setBookmarked] = useState(false);
	const [liked, setLiked] = useState(false);

	function onShare() {
		
	}

	function onBookmark() {
		setBookmarked(!bookmarked);
	}

	function onComment() {
		
	}

	function onLike() {
		setLiked(!liked);
	}

	return (
		<Container className={styles.postContainer}>
			<User username={props.username} userURL={props.userURL}/>
			<Container className={styles.paraContainer}>
				<a href={props.postURL} style={{ textDecoration: 'none', color: 'inherit' }}>
					<Para className={styles.postText} text={props.text} />
					<Para className={styles.postDate} text={props.createdAt?.toLocaleDateString() || ""}/>
				</a>
				<div className={styles.iconsContainer}>
					<div className={styles.share}>
						<RiShareBoxLine />
					</div>
					<div className={styles.book}>
						{bookmarked ? <FaBookmark size={12} onClick={onBookmark}/> : <FaRegBookmark size={12} onClick={onBookmark}/>}
					</div>
					<div className={styles.comment}>
						<FaRocketchat />
					</div>
					<div className={styles.like}>
						{liked ? <FaHeart onClick={onLike}/> : <FaRegHeart onClick={onLike}/>}
					</div>
				</div>
			</Container>
		</Container>
	);
};

export default Post;
