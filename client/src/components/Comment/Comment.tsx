import React, { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import styles from './Comment.module.css';

interface CommentProps {
	postId: string;
}

interface Comment {
	_id: string;
	authorId: string;
	content: string;
	createdAt: string;
	userName: string;
}

const Comment: React.FC<CommentProps> = ({ postId }) => {
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await api.get(`/post/${postId}/comment`);
				if (response.data.success) {
					setComments(response.data.value);
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
					setComments([...comments, response.data.value]);
					setComment('');
				} else {
					console.error(response.data.statusMessage);
				}
			} catch (error) {
				console.error('Error posting comment:', error);
			}
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
					<div key={comment._id} className={styles.comment}>
						<p>
							<strong>{comment.userName}</strong>
						</p>
						<p>{comment.content}</p>
						<p className={styles.commentDate}>{new Date(comment.createdAt).toLocaleString()}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Comment;
