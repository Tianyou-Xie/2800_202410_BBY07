import { useEffect, useRef, useState } from 'react';
import { SmallLoader } from '../loader/small-loader';
import { Else, If, Then } from 'react-if';
import Post from '../post/post';

/**
 * Interface that represents the arguments passed down to the PaginatedPostFeed component.
 *
 * @params Covered on the component documentation
 */
interface Props {
	feedKey: string;
	fetchPage: (page: number) => Promise<any[]>;
}

/**
 * A feed of posts that automatically fetches the next page while a
 * user is scrolling.
 *
 * @param props.feedKey A key that aligns to the uniqueness of this feed, to handle scroll restoration.
 * @param props.fetchPage The function used to fetch new posts. If this returns an empty array, it means that the end has been reached.
 * @returns JSX.Element - PaginatedPostFeed component as a JSX.Element
 */
export const PaginatedPostFeed = (props: Props) => {
	const [page, setPage] = useState(1);
	const [endReached, setEndReached] = useState(false);

	const postsListRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<any[]>([]);

	/**
	 * Function to check if user has scrolled to the bottom of the page and
	 * needs to load the next posts from the database.
	 *
	 * @returns void
	 */
	const checkScroll = () => {
		const postsList = postsListRef.current;
		if (!postsList) return;

		const rect = postsList.getBoundingClientRect();
		const distFromBottom = Math.max(0, rect.bottom - innerHeight);
		if (distFromBottom <= rect.height / 4) setPage((page) => page + 1);
	};

	/**
	 * Use effect used to start a timer to check if user is loading or has
	 * scrolled to the end of the page every 1 second.
	 *
	 * @returns () => void - A function to stop the timer.
	 */
	useEffect(() => {
		if (endReached || loading) return;

		const interval = setInterval(checkScroll, 1000);
		return () => clearInterval(interval);
	}, [endReached, loading]);

	/**
	 * Use effect used to fetch and load new posts at the end of
	 * the page.
	 */
	useEffect(() => {
		setLoading(true);
		props
			.fetchPage(page)
			.then((newPosts) => {
				setEndReached(() => newPosts.length === 0);
				setPosts([...posts, ...newPosts]);
			})
			.catch(() => setEndReached(true))
			.finally(() => setLoading(false));
	}, [page]);

	return (
		<div className='w-100 my-3 d-flex justify-content-center'>
			<div ref={postsListRef} className='w-100 py-2 d-flex flex-column align-items-center gap-3'>
				{posts
					.filter((v) => !!v?._id)
					.map((v, i) => {
						return <Post key={i} {...v} />;
					})}

				<If condition={endReached}>
					<Then>
						<p className='text-center'>There is nothing else to see, so do not look.</p>
					</Then>
					<Else>
						<SmallLoader />
					</Else>
				</If>
			</div>
		</div>
	);
};
