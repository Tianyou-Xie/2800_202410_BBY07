/* Stylesheet imports */
import styles from './post.module.css';

/* Import from React */
import React, { useEffect, useState } from 'react';

/* Imports for frontend api call and authentication verification */
import { api } from '../../lib/axios';

/* Import from other components created */
import Post from '../../components/Post/Post';
import Page from '../../components/Page/Page';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';
import { Loader } from '../../components/loader/loader';
import SEO from '../../components/seo/seo';

/**
 * Post interface used as a model schema for the Post data that is displayed.
 *
 * @param _id string - Id of the post in the database.
 * @param authorId string - Id of the author of the post.
 * @param content string - Text of the post.
 * @param likeCount number - Number of likes of the post.
 * @param commentCount number - Number of comments of the post.
 * @param Location LocationOject - Location in which the post was created. (planetId: string, latitude: number, longitude: number, _id: string)
 * @param media any[] - (TODO) Contains media embedded into the post (image, video, audio, etc.)
 * @param createdAt Date - (optional) Date in which the post was created.
 * @param deleted boolean - If true, displays the post as a deleted post.
 * @param userName string - UserName of author of the post.
 * @param avatarUrl string - Url for displaying the avatar picture of the author of the post.
 * @param parentPost string - If post is a comment, contains the _id of the parent post.
 * @interface Post
 */
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
	avatarUrl: string;
}

/**
 * PostResponse interface used as a model schema for the response that comes from the
 * database containing the Post information as it's value.
 *
 * @interface PostResponse
 * @param statusCode number - Status code of the request (e.g. 404).
 * @param statusMessage string - Status message of the request (e.g. 'Page not found')
 * @param value Post - Post data sent through the request.
 * @param success boolean - True if the request was received, processed and then sent successfully.
 */
interface PostResponse {
	statusCode: number;
	statusMessage: string;
	value: Post;
	success: boolean;
}

/**
 * Interface that represents the arguments passed down to the PostDetailPage component.
 *
 * @params Covered on the component documentation.
 */
interface Props {
	id: string;
}

/**
 * Constructs, manages, and returns the PostDetailPage component.
 *
 * @param id The id of the post
 * @return The PostDetailPage component as a JSX.Element
 */
const PostDetailPage: React.FC<Props> = ({ id }) => {
	const [postDetails, setPostDetails] = useState<Post>();
	const [comment, setComment] = useState('');
	const [isCommenting, setIsCommenting] = useState(false);
	const [postedComments, setPostedComments] = useState<any[]>([]);

	/**
	 *
	 */
	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await api.get<PostResponse>(`/post/${id}`);
				if (response.data.success) setPostDetails(response.data.value);
			} catch { }
		};

		fetchPost();
	}, [id]);

	if (!postDetails) return <Loader />;

	/**
	 *
	 */
	const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(event.target.value);
	};

	/**
	 *
	 */
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

	return (
		<Page
			pageName='Post Detail'
			content={
				<>
					<SEO
						title={`Skynet Post by ${postDetails.userName}`}
						description={postDetails.content.slice(0, Math.min(15, postDetails.content.length)) + '...'}
						og={{ image: postDetails.avatarUrl, imageAlt: postDetails.userName, type: 'website' }}
					/>

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
							{postedComments.map((v, i) => {
								return <Post key={i} {...v} parentPost={undefined} />;
							})}
						</div>

						<PaginatedPostFeed
							feedKey={postDetails!._id}
							fetchPage={(page) =>
								api
									.get(`/post/${postDetails!._id}/comment?page=${page}`)
									.then((v) => v.data.value.map((v: any) => ({ ...v, parentPost: undefined })))
							}
						/>
					</div>
				</>
			}
		/>
	);
};

export default PostDetailPage;
