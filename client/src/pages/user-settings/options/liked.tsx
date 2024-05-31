import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '../../../lib/auth';
import Page from '../../../components/Page/Page';
import { PaginatedPostFeed } from '../../../components/paginated-post-feed/paginated-post-feed';
import Post from '../../../components/Post/Post';
import { api } from '../../../lib/axios';

// Define the Post interface
interface PostType {
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
	parentPost?: string;
	userName: string;
	avatar: string;
}

const LikedPage = () => {
	const user = useContext(UserAuthContext);

	return (
		<Page
			pageName='Liked Posts'
			content={
				<>
					<PaginatedPostFeed
						feedKey={user._id}
						fetchPage={(page) =>
							api.get(`/user/liked?page=${page}`).then((res) => res.data.value.likedPosts)
						}
					/>
				</>
			}
		/>
	);
};

export default LikedPage;
