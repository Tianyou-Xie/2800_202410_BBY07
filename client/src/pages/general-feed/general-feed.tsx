import { api } from '../../lib/axios';

import Page from '../../components/Page/Page';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

// PLEASE, CHECK THE PROMISE USE
// I HAD A PROBLEM WITH USING AWAIT/ASYNC INSIDE ARRAYS
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

export default GeneralFeed;
