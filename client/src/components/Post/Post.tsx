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

/**
 * Post component representing the thumbnail post of an user.
 * 
 * @param username - Username of the author of the post
 * @param text - Text of the post
 * @param postURL - URL of the complete version of the post with comments and more information
 * @param createdAt - (optional) Date in which the post was created
 */
interface PostProp {
	username: string;
	text: string;
	postURL: string;
	createdAt?: Date;
}

/**
 * Component representing the user part of the post (image and username).
 * 
 * @param username - Username of the author of the post (got from the Post's props)
 * @param imageURL - (TODO) Will represent the user's profile pictures as an URL or image file.
 */
interface UserProp {
	username: string;
	imageURL? : string;
}

const User = (props: UserProp): JSX.Element => {
	return (
		<>
			<Container className={styles.userContainer}>{props.username}</Container>
		</>
	);
};

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
			<User username={props.username} />
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
