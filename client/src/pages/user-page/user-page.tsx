import styles from './user-page.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import Profile from '../../components/Profile/Profile';
import { useLocation, useParams } from 'wouter';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { isUser } from '../../lib/isUser';

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

const UserPage = () => {
	const [username, setUsername] = useState('');
	const [follower, setFollower] = useState(0);
	const [following, setFollowing] = useState(0);
	const [postCount, setPostCount] = useState(0);
	const [displayedPosts, setDisplayedPosts] = useState(Array<JSX.Element>());
	const [userID, setUserID] = useState('');
	const [_, navigate] = useLocation();
	let { id } = useParams() ?? '';

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
					// setDisplayedPosts(await getPosts());
				} catch (err) {
					console.log(err);
				}
			}
		};

		getUserData();
	}, []);

	useEffect(() => {
		const displayPosts = async function () {
			setDisplayedPosts(await getPosts());
		};
		displayPosts();
	}, [userID]);

	async function getPosts() {
		try {
			if (userID == '') return;
			const res = await api.get('/feed/' + userID);
			const postArray = res.data.value;
			console.log(postArray);
			let postElements = postArray.map((post: Post) => {
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
			if (postArray.length == 0) {
				postElements = [<>You should post something...</>];
			}
			return postElements;
		} catch (err) {
			console.log(err);
		}
	}

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
						outsideUser
					/>
					{displayedPosts}
				</>
			}
		/>
	);
};

export default UserPage;
