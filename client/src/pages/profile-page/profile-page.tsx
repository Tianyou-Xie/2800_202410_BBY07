import styles from './profile-page.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import Profile from '../../components/Profile/Profile';
import { api } from '../../lib/axios';
import { useContext, useEffect, useState } from 'react';
import { UserAuthContext } from '../../lib/auth';

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
	const [displayedPosts, setDisplayedPosts] = useState(Array<JSX.Element>());

	useEffect(() => {
		const displayPosts = async function () {
			setDisplayedPosts(await getPosts());
		};
		displayPosts();
	}, [user]);

	async function getPosts() {
		try {
			if (!user) return;
			const res = await api.get('/feed/' + user._id);
			const postArray = res.data.value;
			let postElements = postArray.map((post: Post) => {
				return (
					<Post
						username={user.userName}
						authorId={user._id}
						content={post.content}
						postId={post._id}
						key={post._id}
					/>
				);
			});
			if (postArray.length == 0) {
				postElements = [<>Nothing yet...</>];
			}
			return postElements;
		} catch (err) {
			console.log(err);
		}
	}

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
					{displayedPosts}
				</>
			}
		/>
	);
};

export default ProfilePage;
