import styles from './my-feed.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';

const MyFeed = () => {
	const displayedPosts: JSX.Element[] = [];

	const dummyPost = (
		<Post
			username='MarcusTheDumbs'
			content='"It was never bad luck... It was always incompetence"- DARWIN, Charles'
			postId='66450ab930f716df67e47a02'
			authorId='#USER_URL' repostCount={0} likeCount={0} commentCount={0} />
	);

	for (let i = 1; i < 10; i++) {
		displayedPosts.push(dummyPost);
	}

	return <Page pageName='My Feed' content={displayedPosts} />;
};

export default MyFeed;
