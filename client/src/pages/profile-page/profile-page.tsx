import Page from '../../components/kebab-page/kebab-page';
import Profile from '../../components/kebab-profile/kebab-profile';
import { api } from '../../lib/axios';
import { useContext } from 'react';
import { UserAuthContext } from '../../lib/auth';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

/**
 * ProfilePage component representing the own user's profile page, containing profile
 * information and personal feed (all posts made by the user) and being different by
 * being and editable profile page.
 *
 * @return JSX.Element -Profile Page as a JSX.Element
 */
const ProfilePage = () => {
	const user = useContext(UserAuthContext);

	return (
		<Page
			pageName={user.userName.length < 12 ? user.userName : 'My Profile'}
			content={
				<>
					<Profile {...user} />
					<PaginatedPostFeed
						feedKey={user._id}
						fetchPage={(page) => api.get(`/feed/${user._id}?page=${page}`).then((res) => res.data.value)}
					/>
				</>
			}
		/>
	);
};

/**
 * Exports the ProfilePage component for external use.
 */
export default ProfilePage;
