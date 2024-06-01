/* Import from React */
import { useContext } from 'react';

/* Import for the authorized user context */
import { UserAuthContext } from '../../../lib/auth';

/* Imports from other components created */
import Page from '../../../components/kebab-page/kebab-page';
import { PaginatedPostFeed } from '../../../components/paginated-post-feed/paginated-post-feed';

/* Imports for frontend api call and authentication verification */
import { api } from '../../../lib/axios';

/**
 * Constructs, manages, and returns the CommentedPostPage component.
 *
 * @return The CommentedPostPage component as a JSX.Element
 */
const CommentedPostPage = () => {
	const user = useContext(UserAuthContext);

	return (
		<Page
			pageName='Commented Post'
			content={
				<>
					<PaginatedPostFeed
						feedKey={user._id}
						fetchPage={(page) =>
							api.get(`/user/commented?page=${page}`).then((res) => res.data.value.commentedPosts)
						}
					/>
				</>
			}
		/>
	);
};

export default CommentedPostPage;
