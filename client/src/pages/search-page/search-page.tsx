import styles from './search-page.module.css';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import Page from '../../components/kebab1/kebab';
import UIBox from '../../components/UIBox/UIBox';
import { Container } from 'react-bootstrap';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';
import { PaginatedUserList } from '../../components/paginated-user-list/paginated-user-list';

/**
 * Creates a Search Page in which the user can search for posts or users by name/keywords.
 *
 * @return JSX.Element - SearchPage as a JSX.Element
 */
const SearchPage = function () {
	const [search, setSearch] = useState('');
	const [feedComponent, setFeedComponent] = useState<React.ReactNode>();
	// If true, searches for posts
	const [searchPost, setSearchPost] = useState(true);

	/**
	 * Use effect used to search a post everytime the user presses a button between user or
	 * post or everytime the user types something they want to search for.
	 */
	useEffect(() => {
		setFeedComponent(<></>);
		if (search != '') {
			setTimeout(() => {
				setFeedComponent(
					searchPost ? (
						<PaginatedPostFeed
							feedKey={'search'}
							fetchPage={(page) =>
								api.get(`/post/search/${search}?page=${page}`).then((res) => res.data.value)
							}
						/>
					) : (
						<PaginatedUserList
							feedKey={'search'}
							fetchPage={(page) =>
								api.get(`/user/search/${search}?page=${page}`).then((res) => res.data.value)
							}
						/>
					),
				);
			}, 0);
		}
	}, [search, searchPost]);

	/**
	 * Stores what is typed by the user in the search bar in a React state.
	 *
	 * @returns void
	 */
	function storeSearch() {
		const search = document.getElementsByTagName('input');
		const content = search[0].value;
		setSearch(content);
	}

	return (
		<Page
			pageName='Search'
			content={
				<>
					<Container className={styles.general}>
						<UIBox
							className={styles.search}
							content={
								<input
									type='text'
									id='search-bar'
									name='search'
									className={styles.searchBox}
									placeholder='Search for anything in the universe...'
									autoComplete='off'
									onChange={storeSearch}></input>
							}
							curved
						/>
						<div className={styles.buttons}>
							<button
								className={styles.submit + (searchPost ? ' ' + styles.selected : '')}
								onClick={() => setSearchPost(true)}>
								Posts
							</button>
							<button
								className={styles.submit + (searchPost ? '' : ' ' + styles.selected)}
								onClick={() => setSearchPost(false)}>
								Users
							</button>
						</div>
					</Container>
					<div className='container'>{feedComponent}</div>
				</>
			}
		/>
	);
};

export default SearchPage;
