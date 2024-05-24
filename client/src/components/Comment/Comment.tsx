import React, { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import styles from './Comment.module.css';

import UIBox from '../UIBox/UIBox';

// Icons
import { FaRegHeart } from 'react-icons/fa'; //<FaRegHeart /> //Empty heart
import { FaHeart } from 'react-icons/fa'; //<FaHeart /> // Filled heart
import { RiShareBoxLine } from 'react-icons/ri'; //<RiShareBoxLine />
import { FaRegBookmark } from 'react-icons/fa'; //<FaRegBookmark /> //Empty bookmark
import { FaBookmark } from 'react-icons/fa'; //<FaBookmark /> //Filled bookmark
import { FaRocketchat } from 'react-icons/fa'; //<FaRocketchat />
import { Link } from 'wouter';

interface CommentProps {
	postId: string;
}

interface Comment {
	_id: string;
	authorId: string;
	content: string;
	createdAt: string;
	userName: string;
	repost: number;
	like: number;
	comment: number;
}

interface UserProp {
	username: string;
	userURL: string;
	imageURL?: string;
}

const User = (props: UserProp): JSX.Element => {
	return (
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
	);
};

const Comment: React.FC<CommentProps> = ({ postId }) => {
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await api.get(`/post/${postId}/comment`);
				if (response.data.success) {
					const sortedComments = response.data.value.sort(
						(a: Comment, b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
					setComments(sortedComments);
				} else {
					console.error(response.data.statusMessage);
				}
			} catch (error) {
				console.error('Error fetching comments:', error);
			}
		};

		fetchComments();
	}, [postId]);

	const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(event.target.value);
	};

	const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (comment.trim()) {
			try {
				const response = await api.post(`/post/${postId}/comment`, { content: comment });
				if (response.data.success) {
					const newComment = response.data.value;
					const updatedComments = [newComment, ...comments].sort(
						(a: Comment, b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
					setComments(updatedComments);
					setComment('');
				} else {
					console.error(response.data.statusMessage);
				}
			} catch (error) {
				console.error('Error posting comment:', error);
			}
		}
	};

	const [bookmarked, setBookmarked] = useState(false);
	const [liked, setLiked] = useState(false);

	function onBookmark() {
		setBookmarked(!bookmarked);
	}

	function onComment() { }

	function onLike() {
		setLiked(!liked);
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1; // Months are zero-indexed
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
	}

	return (
		<div className={styles.commentContainer}>
			<form onSubmit={handleCommentSubmit} className={styles.commentForm}>
				<textarea
					value={comment}
					onChange={handleCommentChange}
					className={styles.commentTextArea}
					placeholder='Write a comment...'
				/>
				<button type='submit' className={styles.commentButton}>
					Submit
				</button>
			</form>
			<div className={styles.commentsList}>
				{comments.map((comment) => (
					<div key={comment._id} className={styles.postContainer}>
						<User username={comment.userName} userURL={comment.authorId} />
						<UIBox
							className={styles.paraContainer}
							curved
							content={
								<>
									<Link href={comment._id} className={styles.link}>
										<p>{comment.content}</p>
										{comment.createdAt ? (
											<p className={styles.postDate}>{formatDate(comment.createdAt)}</p>
										) : undefined}
									</Link>
									<div className={styles.iconsContainer}>
										<p>{comment.repost}</p>
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
										<p>{comment.comment}</p>
										<button onClick={onLike} className={styles.like}>
											{liked ? <FaHeart /> : <FaRegHeart />}
										</button>
										<p>{comment.like}</p>
									</div>
								</>
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Comment;
