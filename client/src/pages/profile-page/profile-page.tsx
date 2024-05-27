import styles from './profile-page.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import Profile from '../../components/Profile/Profile';
import { api } from '../../lib/axios';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '../../lib/auth';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

interface Post {
	authorId: string;
	commentCount: number;
	content: string;
	createdAt: Date;
	deleted: false;
	likeCount: number;
	location: {
		planetId: string;
		latitude: number;
		longitude: number;
		_id: string;
	};
	media: [];
	repostCount: number;
	__v: number;
	_id: string;
}

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
						// description='I like eating lettuce and broccoli'
						follower={user.followerCount}
						following={user.followingCount}
						postCount={user.postCount}
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
