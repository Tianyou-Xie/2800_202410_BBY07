import { useState, useEffect } from 'react';
import { api } from '../../lib/axios';

import styles from './general-feed.module.css';
import Container from 'react-bootstrap/Container';

import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';

const GeneralFeed = () => {
	const displayedPosts: JSX.Element[] = [];

	// interface Reference {
	// 	authorId: { username: string; userURL: string };
	// 	content: string;
	// 	likeCount: number;
	// 	commentCount: number;
	// 	repostCount: number;
	// 	createdAt: Date;
	// }

	// const [planets, setPlanets] = useState<Array<Planet>>([]);
	useEffect(() => {
		async function fetchPost() {
			try {
				const res = await api.post('/post/6646a3b24b2d7d6a935eeea3');
				console.log(res);
			} catch(err) {
				console.log(err);
			}
		}

		fetchPost();
	}, []);

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
		<html>
			<body>
				<Page pageName="General Feed" content={displayedPosts} />
			</body>
		</html>
	);
};

export default GeneralFeed;
