import styles from './my-feed.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';

const MyFeed = () => {
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
		<Page pageName="My Feed" content={displayedPosts} />
	);
};

export default MyFeed;
