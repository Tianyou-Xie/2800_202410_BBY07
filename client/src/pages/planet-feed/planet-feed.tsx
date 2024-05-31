import { api } from '../../lib/axios';

import Page from '../../components/kebab1/kebab';
import { useParams } from 'wouter';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

/**
 * PlanetFeed component representing a specific planet feed containing posts only from that
 * planet.
 *
 * @return JSX.Element - Planet Feed page as an JSX.Element
 */
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
