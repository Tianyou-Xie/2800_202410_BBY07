import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '../../../lib/auth';
import Page from '../../../components/Page/Page';
import { PaginatedPostFeed } from '../../../components/paginated-post-feed/paginated-post-feed';
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
	parentPost: string;
	userName: string;
	avatar: string;
}

const SavedPage = () => {
	const user = useContext(UserAuthContext);

	return (
		<Page
			pageName='Saved Posts'
			content={
				<>
					<PaginatedPostFeed
						feedKey={user._id}
						fetchPage={(page) =>
							api.get(`/user/saved?page=${page}`).then((res) => res.data.value.savedPosts)
						}
					/>
				</>
			}
		/>
	);
};

export default SavedPage;
