import styles from './Page.module.css';
import Container from 'react-bootstrap/Container';

import Header from '../Header/Header';
import Hotbar from '..//Hotbar/Hotbar';
import Post from '../Post/Post';

interface PageProp {
	content: JSX.Element | JSX.Element[];
	pageName?: string;
	noHeader?: boolean;
}

/**
 * Component for a page with content wrapped with header and hotbar.
 *
 * @param props.pageName string - (Optional) Name of the page
 * @param props.content JSX.Element | JSX.Element[] - Content that will be added in the middle
 * @param props.noHeader boolean - (Optional) Takes off the header
 * @returns JSX.Element
 */
const Page = (props: PageProp) => {
	const noHeader = (props.noHeader) ? styles.noHeader : "";
	const pageClass = styles.pageContainer + noHeader;

	return (
		<html>
			<body>
				<Container className={pageClass}>
					{props.noHeader ? (
						<></>
					) : (
						<div className={styles.header}>
							<Header pageName={(props.pageName) ? props.pageName : ""} />
						</div>
					)}
					<Container className={styles.content}>{props.content}</Container>
					<div className={styles.navbar}><Hotbar /></div>
				</Container>
			</body>
		</html>
	);
};

export default Page;
