import styles from './profile-page.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import Profile from '../../components/Profile/Profile';
import { api } from '../../lib/axios';
import { useState } from 'react';

const ProfilePage = () => {
	const [username, setUsername] = useState('');
	const [follower, setFollower] = useState(0);
	const [following, setFollowing] = useState(0);
	const [postCount, setPostCount] = useState(0);

	const displayedPosts: JSX.Element[] = [];

	(async function getUserDate() {
		try {
			const res = await api.get('/user/');
			const data = res.data.value;
			setUsername(data.userName);
			setFollower(data.followerCount);
			setFollowing(data.followingCount);
			setPostCount(data.postCount);
		} catch (err) {
			console.log(err);
		}
	})();

	const dummyPost = (
		<Post
			username='@MarcusTheDumbs'
			text='"It was never bad luck... It was always incompetence"- DARWIN, Charles'
			postURL='./about'
			userURL='#USER_URL'
		/>
	);

	for (let i = 1; i < 10; i++) {
		displayedPosts.push(dummyPost);
	}

	return (
		<Page
			pageName='My Feed'
			content={
				<>
					<Profile
						username={username}
						// description='I like eating lettuce and broccoli'
						follower={follower}
						following={following}
						postCount={postCount}
					/>
					{displayedPosts}
				</>
			}
		/>
	);
};

export default ProfilePage;
