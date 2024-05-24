import React, { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import styles from './Comment.module.css';
import UIBox from '../UIBox/UIBox';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark, FaRocketchat } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';
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
	isSaved?: boolean;
	isLiked?: boolean;
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
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);

	const fetchComments = async (page: number) => {
		setLoading(true);
		try {
			const response = await api.get(`/post/${postId}/comment`, {
				params: { limit: 10, page },
			});
			if (response.data.success) {
				const commentsWithStatus = await Promise.all(
					response.data.value.map(async (comment: Comment) => {
						const [savedRes, likedRes] = await Promise.all([
							api.get(`/post/${comment._id}/save`),
							api.get(`/post/${comment._id}/like`),
						]);
						return {
							...comment,
							isSaved: savedRes.data.success ? savedRes.data.value : false,
							isLiked: likedRes.data.value === null ? true : false,
						};
					})
				);
				setComments((prevComments) => [...prevComments, ...commentsWithStatus]);
				setHasMore(commentsWithStatus.length === 10); // Assuming 10 is the limit
			} else {
				console.error(response.data.statusMessage);
			}
		} catch (error) {
			console.error('Error fetching comments:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchComments(page);
	}, [page, postId]);

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
					const [savedRes, likedRes] = await Promise.all([
						api.get(`/post/${newComment._id}/save`),
						api.get(`/post/${newComment._id}/like`),
					]);
					newComment.isSaved = savedRes.data.success ? savedRes.data.value : false;
					newComment.isLiked = likedRes.data.value === null ? true : false;
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

	const handleBookmark = async (commentId: string, isSaved: boolean) => {
		try {
			if (isSaved) {
				await api.delete(`/post/${commentId}/save`);
			} else {
				await api.post(`/post/${commentId}/save`);
			}
			setComments((prevComments) =>
				prevComments.map((comment) =>
					comment._id === commentId ? { ...comment, isSaved: !isSaved } : comment
				)
			);
		} catch (error) {
			console.error('Error updating save status:', error);
		}
	};

	const handleLike = async (commentId: string, isLiked: boolean) => {
		try {
			if (isLiked) {
				await api.delete(`/post/${commentId}/like`);
				setComments((prevComments) =>
					prevComments.map((comment) =>
						comment._id === commentId ? { ...comment, like: comment.like - 1, isLiked: false } : comment
					)
				);
			} else {
				await api.post(`/post/${commentId}/like`);
				setComments((prevComments) =>
					prevComments.map((comment) =>
						comment._id === commentId ? { ...comment, like: comment.like + 1, isLiked: true } : comment
					)
				);
			}
		} catch (error) {
			console.error('Error updating like status:', error);
		}
	};

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

	const loadMoreComments = () => {
		if (hasMore && !loading) {
			setPage((prevPage) => prevPage + 1);
		}
	};

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
										<button
											className={styles.book}
											onClick={() => handleBookmark(comment._id, comment.isSaved ?? false)}
										>
											{comment.isSaved ? <FaBookmark /> : <FaRegBookmark />}
										</button>
										<button className={styles.comment}>
											<FaRocketchat />
										</button>
										<p>{comment.comment}</p>
										<button onClick={() => handleLike(comment._id, comment.isLiked ?? false)} className={styles.like}>
											{comment.isLiked ? <FaHeart /> : <FaRegHeart />}
										</button>
										<p>{comment.like}</p>
									</div>
								</>
							}
						/>
					</div>
				))}
				{hasMore && (
					<button onClick={loadMoreComments} className={styles.loadMoreButton}>
						Load More Comments
					</button>
				)}
			</div>
		</div>
	);
};

export default Comment;
