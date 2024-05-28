import styles from './search-page.module.css';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import Page from '../../components/Page/Page';
import UIBox from '../../components/UIBox/UIBox';
import { Container } from 'react-bootstrap';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';
import { PaginatedUserList } from '../../components/paginated-user-list/paginated-user-list';

const SearchPage = function () {
	const [search, setSearch] = useState('');
	const [feedComponent, setFeedComponent] = useState<React.ReactNode>();
	// If true, searches for posts
	const [searchPost, setSearchPost] = useState(true);

	useEffect(() => {
		setFeedComponent(<></>);
		if (search != '') {
			setTimeout(() => {
				setFeedComponent(
					searchPost ? (
						<PaginatedPostFeed
							feedKey={'search'}
							fetchPage={(page) =>
								api.get(`/search/${search}?page=${page}`).then((res) => res.data.value.posts)
							}
						/>
					) : (
						<PaginatedUserList
							feedKey={'search'}
							fetchPage={(page) =>
								api.get(`/search/${search}?page=${page}`).then((res) => res.data.value.users)
							}
						/>
					),
				);
			}, 0);
		}
	}, [search, searchPost]);

	function doSearch() {
		const search = document.getElementsByTagName('input');
		const content = search[0].value;
		setSearch(content);
	}

	function switchSearch(postOrUser: boolean) {
		setSearchPost(postOrUser);
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
									onChange={doSearch}></input>
							}
							curved
						/>
						<div className={styles.buttons}>
							<button
								className={styles.submit + (searchPost ? ' ' + styles.selected : '')}
								onClick={() => switchSearch(true)}>
								Posts
							</button>
							<button
								className={styles.submit + (searchPost ? '' : ' ' + styles.selected)}
								onClick={() => switchSearch(false)}>
								Users
							</button>
						</div>
					</Container>
					{feedComponent}
				</>
			}
		/>
	);
};

export default SearchPage;
