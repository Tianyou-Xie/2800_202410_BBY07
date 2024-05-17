import { useState, useEffect } from 'react';
import { api } from '../../lib/axios';

import styles from './my-feed.module.css';
import Container from 'react-bootstrap/Container';

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
		<html>
			<body>
				<Page pageName="My Feed" content={displayedPosts} />
			</body>
		</html>
	);
};

export default MyFeed;
