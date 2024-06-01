/* Imported from React */
import { useContext } from 'react';

/* Import for the authorized user context */
import { UserAuthContext } from '../../../lib/auth';

/* Imports from other components created */
import Page from '../../../components/page/page';
import { PaginatedPostFeed } from '../../../components/paginated-post-feed/paginated-post-feed';

/* Imports for frontend api call and authentication verification */
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

/**
 * Constructs, manages, and returns the LikedPage component.
 *
 * @return The LikedPage component as a JSX.Element
 */
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
