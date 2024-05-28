import styles from './search-page.module.css';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import Page from '../../components/Page/Page';
import UIBox from '../../components/UIBox/UIBox';
import { Container } from 'react-bootstrap';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';

const SearchPage = function () {
	const [searchKey, setSearchKey] = useState('');
	const [feedComponent, setFeedComponent] = useState(<></>);

	useEffect(() => {
		// let feed = (
		// 	<PaginatedPostFeed
		// 		feedKey={'search'}
		// 		fetchPage={(page) => api.get(`/feed/${searchKey}?page=${page}`).then((res) => res.data.value.posts)}
		// 	/>
		// );
		setFeedComponent(<>{searchKey}</>);
	}, [searchKey]);

	function doSearch() {
		const search = document.getElementsByTagName('input');
		const content = search[0].value;
		setSearchKey(content);
	}

	return (
		<Page
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
						<div className={styles.sideButtons}>
							<button className={styles.submit} onClick={doSearch}>
								<UIBox className={styles.submitBox} content='Search' curved dark clickable />
							</button>
						</div>
					</Container>
					<Container>{feedComponent}</Container>
				</>
			}
		/>
	);
};

export default SearchPage;
