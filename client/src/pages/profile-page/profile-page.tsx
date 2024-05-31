import Page from '../../components/Page/Page';
import Profile from '../../components/Profile/Profile';
import { api } from '../../lib/axios';
import { useContext } from 'react';
import { UserAuthContext } from '../../lib/auth';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

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

export default ProfilePage;
