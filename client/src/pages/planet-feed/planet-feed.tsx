import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import { useParams } from 'wouter';

// PLEASE, CHECK THE PROMISE USE
// I HAD A PROBLEM WITH USING AWAIT/ASYNC INSIDE ARRAYS
const PlanetFeed = () => {
	const [displayedPosts, setDisplayedPosts] = useState(Array<JSX.Element>());
	let { id } = useParams() ?? '';
	let { planetName } = useParams() ?? '';

	useEffect(() => {
		const displayPosts = async function () {
			let postArray = await fetchPost();
			if (postArray == undefined) {
				postArray = [<>Nothing yet...</>];
			}
			setDisplayedPosts(postArray);
		};
		displayPosts();
	}, []);

	async function fetchPost() {
		try {
			const postRes = await api.get(`/feed/${id}`);
			const postArray = postRes.data.value;
			let postElements: Promise<JSX.Element[]> = Promise.all(
				postArray.map(async (post: any) => {
					const authorRes = await api.get('/user/' + post.authorId);
					const authorData = authorRes.data.value;
					return (
						<Post
							username={authorData.userName}
							authorId={authorData._id}
							content={post.content}
							postId={post._id}
							key={post._id}
						/>
					);
				}),
			);
			return postElements;
		} catch (err) {
			console.log(err);
		}
	}

	return <Page pageName={`${planetName}`} content={displayedPosts} />;
};

export default PlanetFeed;
