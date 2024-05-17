import styles from './Page.module.css';

import Header from '../Header/Header';
import Hotbar from '..//Hotbar/Hotbar';

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
	const noHeader = props.noHeader ? styles.noHeader : '';
	const pageClass = styles.pageContainer + noHeader;

	return (
		<div className={pageClass}>
			{props.noHeader ? (
				<></>
			) : (
				<div className={styles.header}>
					<Header pageName={props.pageName ? props.pageName : ''} />
				</div>
			)}
			<div className={styles.content}>
				<div className='d-flex flex-column gap-4 p-3 align-items-center'>{props.content}</div>
			</div>
			<div className={styles.navbar}>
				<Hotbar />
			</div>
		</div>
	);
};

export default Page;
