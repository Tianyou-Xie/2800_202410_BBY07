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
			pageName='Profile'
			content={
				<>
					<Profile
						userId={user._id}
						username={user.userName}
						description={user.bio}
						follower={user.followerCount}
						following={user.followingCount}
						postCount={user.postCount}
						avatar={user.avatarUrl}
						planetId={user.location.planetId}
						createdAt={user.createdAt}
					/>
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
