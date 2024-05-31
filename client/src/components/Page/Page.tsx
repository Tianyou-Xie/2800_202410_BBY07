import styles from './Page.module.css';

import Header from '../Header/Header';
import Hotbar from '../hotbar/hotbar';

/**
 * Interface that represents the arguments passed down to the Page component.
 *
 * @params Covered on the component documentation.
 */
interface PageProp {
	pageName?: string;
	content: JSX.Element | JSX.Element[];
	logoHeader?: boolean;
	noHeader?: boolean;
	noNavbar?: boolean;
	noBootstrap?: boolean;
}

/**
 * Component for a page with content wrapped with header and hotbar.
 *
 * @param props.pageName string - (Optional) Name of the page
 * @param props.content JSX.Element | JSX.Element[] - Content that will be added in the middle
 * @param props.logoHeader boolean - (Optional) Gives a header with only website name if true. If false give regular header
 * @param props.noHeader boolean - (Optional) Takes off the header
 * @param props.noNavbar boolean - (Optional) Takes off the navbar
 * @param props.noBootstrap boolean - (Optional) Takes off the bootstrap content container format
 * @returns JSX.Element - Page component as a JSX.Element
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
					<Header pageName={props.pageName ? props.pageName : ''} enableLogoHeader={props.logoHeader} />
				</div>
			)}
			<div className={styles.content}>
				<div className={props.noBootstrap ? '' : 'd-flex flex-column gap-4 p-3 align-items-center'}>
					{props.content}
				</div>
			</div>
			{props.noNavbar ? (
				<></>
			) : (
				<div className={styles.navbar}>
					<Hotbar />
				</div>
			)}
		</div>
	);
};

/**
 * Exports the Page component for external use.
 */
export default Page;
