import styles from './profile-page.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import Profile from '../../components/Profile/Profile';
import { api } from '../../lib/axios';
import { useState } from 'react';

const ProfilePage = () => {
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

	const [username, setUsername] = useState('');
	const [follower, setFollower] = useState(0);
	const [following, setFollowing] = useState(0);
	const [postCount, setPostCount] = useState(0);
	const [displayedPosts, setDisplayedPosts] = useState(Array<JSX.Element>());

	let userID: string;

	(async function getUserDate() {
		try {
			const res = await api.get('/user/');
			const data = res.data.value;
			userID = data._id;
			setUsername(data.userName);
			setFollower(data.followerCount);
			setFollowing(data.followingCount);
			setPostCount(data.postCount);
			setDisplayedPosts(await getPosts());
		} catch (err) {
			console.log(err);
		}
	})();

	async function getPosts() {
		try {
			const res = await api.get('/feed/' + userID);
			const postArray = res.data.value;
			const postElements = postArray.map((post: Post) => {
				return (
					<Post
						username={username}
						authorId={userID}
						content={post.content}
						postId={post._id}
						key={post._id}
					/>
				);
			});
			return postElements;
		} catch (err) {
			console.log(err);
		}
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
