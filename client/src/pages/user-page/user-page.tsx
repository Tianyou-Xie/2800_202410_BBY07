import styles from './user-page.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import Profile from '../../components/Profile/Profile';

const UserPage = () => {
	const displayedPosts: JSX.Element[] = [];

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
						username='Hamster'
						description='I like eating lettuce and broccoli'
						follower={0}
						following={0}
						postCount={0}
					/>
					{displayedPosts}
				</>
			}
		/>
	);
};

export default UserPage;
