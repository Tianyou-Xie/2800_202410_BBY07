import styles from './user-page.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import Profile from '../../components/Profile/Profile';
import { useLocation, useParams } from 'wouter';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { isUser } from '../../lib/isUser';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

interface Post {
	authorId: string;
	commentCount: number;
	content: string;
	createdAt: Date;
	deleted: false;
	likeCount: number;
    avatar: string,
	location: {
		planetId: string;
		latitude: number;
		longitude: number;
		_id: string;
	};
	media: [];
	__v: number;
	_id: string;
}

const UserPage = () => {
	const [username, setUsername] = useState('');
	const [follower, setFollower] = useState(0);
	const [following, setFollowing] = useState(0);
	const [postCount, setPostCount] = useState(0);
	const [userID, setUserID] = useState('');
	const [avatar, setAvatar] = useState('');
	const [_, navigate] = useLocation();
	let { id = '' } = useParams();

	useEffect(() => {
		const getUserData = async function () {
			if (id !== undefined && (await isUser(id))) {
				navigate('/profile');
				return;
			} else {
				try {
					if (id == '') return;
					const res = await api.get('/user/' + id);
					const data = res.data.value;
					setUserID(data._id);
					setUsername(data.userName);
					setFollower(data.followerCount);
					setFollowing(data.followingCount);
					setPostCount(data.postCount);
					setAvatar(data.avatarUrl);
					// setDisplayedPosts(await getPosts());
				} catch (err) {
					console.log(err);
				}
			}
		};

		getUserData();
	}, []);

	return (
		<Page
			pageName={username}
			content={
				<>
					<Profile
						userId={userID}
						username={username}
						// description={'I like eating lettuce and broccoli'}
						follower={follower}
						following={following}
						postCount={postCount}
                        avatar={avatar}
						outsideUser
					/>

					<PaginatedPostFeed
						feedKey={id}
						fetchPage={(page) => api.get(`/feed/${id}?page=${page}`).then((res) => res.data.value)}
					/>
				</>
			}
		/>
	);
};

export default UserPage;
