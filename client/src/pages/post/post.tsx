import styles from './post.module.css';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import Post from '../../components/Post/Post';
import Page from '../../components/Page/Page';
import Comment from '../../components/Comment/Comment';

interface Post {
	_id: string;
	authorId: string;
	content: string;
	likeCount: number;
	commentCount: number;
	repostCount: number;
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
	const [post, setPost] = useState<Post | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await api.get<PostResponse>(`/post/${id}`);
				if (response.data.success) {
					setPost(response.data.value);
				} else {
					setError(response.data.statusMessage);
				}
			} catch (err) {
				setError('Error fetching the post.');
			}
		};

		fetchPost();
	}, [id]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!post) {
		return <div>Loading...</div>;
	}

	const postDetail = (
		<Post
			username={post.userName}
			content={post.content}
			authorId={`${post.authorId}`}
			postId={`${post._id}`}
			createdAt={new Date(post.createdAt)}
			repost={post.repostCount}
			like={post.likeCount}
			comment={post.commentCount}
		/>
	);

	return (
		<Page
			pageName='Post Detail'
			content={
				<>
					{postDetail}
					<Comment postId={post._id} />
				</>
			}
		/>
	);
};

export default PostDetailPage;
