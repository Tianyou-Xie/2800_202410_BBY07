import styles from './general-feed.module.css';
import Container from 'react-bootstrap/Container';

import Header from '../../components/Header/Header';
import Hotbar from '../../components/Hotbar/Hotbar';
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
				<Container className={styles.pageContainer}>
					<div className={styles.header}>
						<Header pageName='General feed'/>
					</div>
					<Container className={styles.posts}>{displayedPosts}</Container>
                    <div className={styles.hotbar}>
						<Hotbar pageName='General feed'/>
					</div>
				</Container>
			</body>
		</html>
	);
};

export default GeneralFeed;
