import { api } from '../../lib/axios';

import Page from '../../components/kebab1/kebab';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

/**
 * GeneralFeed component representing the feed in which all the posts are aggregated
 * from other planets and filtered/sortered.
 *
 * @return JSX.Element - General Feed page as an JSX.Element
 */
const GeneralFeed = () => {
	return (
		<Page
			pageName='Galactic Feed'
			content={
				<PaginatedPostFeed
					feedKey='general'
					fetchPage={(page) => api.get(`/feed?page=${page}`).then((res) => res.data.value)}
				/>
			}
		/>
	);
};

/**
 * Exports the GeneralFeed component for external use.
 */
export default GeneralFeed;
