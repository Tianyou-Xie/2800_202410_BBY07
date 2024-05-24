import { useEffect } from 'react';
import { api } from '../../lib/axios';

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
				const res = await api.post('/post/66450ab930f716df67e47a02');
				console.log(res);
			} catch (err) {
				console.log(err);
			}
		}

		fetchPost();
	}, []);

	const dummyPost = (
		<Post
			username='Zyrakia'
			content='"Hello World! This is the first ever post to Skynet!!!'
			postId='66450ab930f716df67e47a02'
			authorId='66450ab930f716df67e47a02' repost={21} like={22} comment={12} />
	);

	for (let i = 1; i < 10; i++) {
		displayedPosts.push({ ...dummyPost, key: i.toString() });
	}

	return <Page pageName='General Feed' content={displayedPosts} />;
};

export default GeneralFeed;
