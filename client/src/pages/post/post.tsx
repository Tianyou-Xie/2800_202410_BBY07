import styles from './post.module.css';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import Post from '../../components/Post/Post';
import Page from '../../components/Page/Page';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';
import { Loader } from '../../components/loader/loader';

interface Post {
	_id: string;
	authorId: string;
	content: string;
	likeCount: number;
	commentCount: number;
	location: {
		planetId: string;
		latitude: number;
		longitude: number;
		_id: string;
	};
	media: any[];
	createdAt: Date;
	deleted: boolean;
	userName: string;
}

interface PostResponse {
	statusCode: number;
	statusMessage: string;
	value: Post;
	success: boolean;
}

interface Props {
	id: string;
}

const PostDetailPage: React.FC<Props> = ({ id }) => {
	const [postDetails, setPostDetails] = useState<Post>();
	const [comment, setComment] = useState('');
	const [isCommenting, setIsCommenting] = useState(false);
	const [postedComments, setPostedComments] = useState<any[]>([]);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await api.get<PostResponse>(`/post/${id}`);
				if (response.data.success) setPostDetails(response.data.value);
			} catch {}
		};

		fetchPost();
	}, [id]);

	const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(event.target.value);
	};

	const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		if (!postDetails) return;

		event.preventDefault();
		const content = comment.trim();
		if (!content) return;

		if (isCommenting) return;
		setIsCommenting(true);

		try {
			const response = await api.post(`/post/${postDetails._id}/comment`, { content });
			if (!response.data.success) return;

			const newComment = response.data.value;
			setPostedComments([newComment, ...postedComments]);

			setComment('');
		} catch (error) {
			console.error('Error posting comment:', error);
		} finally {
			setIsCommenting(false);
		}
	};

	if (!postDetails) return <Loader />;

	return (
		<Page
			pageName='Post Detail'
			content={
				<>
					<Post
						{...postDetails}
						commentCount={postDetails.commentCount + postedComments.length}
						displayTime={true}
					/>

					<hr className='w-100 m-0' />

					<form
						onSubmit={handleCommentSubmit}
						style={{ maxWidth: '750px' }}
						className='w-100 m-3 d-flex flex-column align-items-center justify-content-center gap-3'>
						<textarea
							value={comment}
							onChange={handleCommentChange}
							className={styles.commentTextArea}
							placeholder='Write a comment...'
						/>
						<button type='submit' className={`ms-auto ${styles.commentButton}`} disabled={isCommenting}>
							Comment
						</button>
					</form>

					<div className='w-100 px-3 d-flex flex-column align-items-center justify-content-center'>
						<div className='w-100 d-flex flex-column align-items-center justify-content-center gap-3'>
							{postedComments.map((v) => {
								return <Post {...v} isRoot={true} />;
							})}
						</div>

						<PaginatedPostFeed
							feedKey={postDetails!._id}
							fetchPage={(page) =>
								api
									.get(`/post/${postDetails!._id}/comment?page=${page}`)
									.then((v) => v.data.value.map((v: any) => ({ ...v, isRoot: true })))
							}
						/>
					</div>
				</>
			}
		/>
	);
};

export default PostDetailPage;
