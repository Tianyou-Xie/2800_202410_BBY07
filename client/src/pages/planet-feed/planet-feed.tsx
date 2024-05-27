import { api } from '../../lib/axios';

import Page from '../../components/Page/Page';
import { useParams } from 'wouter';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

// PLEASE, CHECK THE PROMISE USE
// I HAD A PROBLEM WITH USING AWAIT/ASYNC INSIDE ARRAYS
const PlanetFeed = () => {
	let { id = '' } = useParams();
	let { planetName = 'unknown' } = useParams();

	return (
		<Page
			pageName={`${planetName}`}
			content={
				<PaginatedPostFeed
					feedKey={id}
					fetchPage={(page) => api.get(`/feed/${id}?page=${page}`).then((res) => res.data.value)}
				/>
			}
		/>
	);
};

export default PlanetFeed;
