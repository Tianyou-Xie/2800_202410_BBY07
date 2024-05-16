import styles from './general-feed.module.css';
import Container from 'react-bootstrap/Container';

import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';

const GeneralFeed = () => {
	const displayedPosts: JSX.Element[] = [];
	const dummyPost = <Post username='@MarcusTheDumbs' text='"It was never bad luck... It was always incompetence"- DARWIN, Charles' postURL='./about'/>;

	for (let i = 1; i < 10; i++) {
		displayedPosts.push(dummyPost);
	}

	return (
		<html>
			<body>
				<Page content={displayedPosts} noHeader={true}/>
			</body>
		</html>
	);
};

export default GeneralFeed;
