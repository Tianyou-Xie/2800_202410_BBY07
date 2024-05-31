import { useContext } from 'react';
import { UserAuthContext } from '../../../lib/auth';
import Page from '../../../components/Page/Page';
import { PaginatedPostFeed } from '../../../components/paginated-post-feed/paginated-post-feed';
import { api } from '../../../lib/axios';

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
