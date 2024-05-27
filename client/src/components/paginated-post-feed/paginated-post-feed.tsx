import { useEffect, useRef, useState } from 'react';
import { SmallLoader } from '../loader/small-loader';
import { Else, If, Then } from 'react-if';
import Post from '../Post/Post';

interface Props {
	/**
	 * A key that aligns to the uniqueness of this feed,
	 * to handle scroll restoration.
	 */
	feedKey: string;

	/**
	 * The function used to fetch new posts.
	 * If this returns an empty array, it means that the end has been reached.
	 */
	fetchPage: (page: number) => Promise<any[]>;
}

/**
 * A feed of posts that automatically fetches the next page while a
 * user is scrolling.
 */
export const PaginatedPostFeed = (props: Props) => {
	const [page, setPage] = useState(0);
	const [endReached, setEndReached] = useState(false);

	const postsListRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<any[]>([]);

	const fetchIncrement = async (increment: number) => {
		if (loading || endReached) return;

		const nextPage = (page ?? 0) + increment;
		if (nextPage < 1) return;

		const newPosts = await props.fetchPage(nextPage);
		if (newPosts.length === 0) return setEndReached(true);

		setPage(nextPage);
		setPosts(increment < 0 ? [...newPosts, ...posts] : [...posts, ...newPosts]);
	};

	const checkScroll = () => {
		if (loading || endReached) return;

		const postsList = postsListRef.current;
		if (!postsList) return;

		const scrollBottom = window.scrollY + window.innerHeight;

		let increment;
		if (scrollBottom > postsList.scrollHeight - window.innerHeight) increment = 1;

		if (!increment) return;

		setLoading(true);
		fetchIncrement(increment).then(() => setLoading(false));
	};

	useEffect(checkScroll, []);
	useEffect(() => {
		const interval = setInterval(checkScroll, 1000);
		return () => clearInterval(interval);
	});

	return (
		<div className='w-100 my-3 d-flex justify-content-center'>
			<div ref={postsListRef} className='w-100 py-2 d-flex flex-column align-items-center gap-3'>
				{posts
					.filter((v) => !!v)
					.map((v, i) => {
						return (
							<Post
								key={i}
								postId={v._id}
								authorId={v.authorId}
								content={v.content}
								commentCount={v.commentCount}
								createdAt={v.createdAt}
								likeCount={v.likeCount}
								location={v.location}
							/>
						);
					})}

				<If condition={endReached}>
					<Then>
						<p>There is nothing else to see, so do not look.</p>
					</Then>
					<Else>
						<SmallLoader />
					</Else>
				</If>
			</div>
		</div>
	);
};
