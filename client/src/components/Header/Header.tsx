import styles from './Header.module.css';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

/**
 * The props types for the Header.
 *
 * pageName: The name of the page. Needed only if enableLogoHeader is false.
 * enableLogoHeader: If true, then the "sky.net" logo will be visible on the top left in the header.
 * 					 If false then default header will be visible.
 */
interface Props {
	pageName?: string;
	enableLogoHeader: boolean;
}

/**
 * Returns the customized header for the page with the provided properties.
 *
 * @param props the props for this header, as seen outlined in the interface.
 * @returns Returns the customized header for the page.
 */
const Header = (props: Props) => {
	return (
		<>
			{props.enableLogoHeader ? (
				<div className={styles.logoHeader}>
					<h1>sky.net</h1>
				</div>
			) : (
				<Navbar expand='lg' className={`${styles.headerContainer}`}>
					<Container>
						<Navbar.Text onClick={handlePageReturn}>
							<IoArrowBackCircleOutline className={styles.returnIcon} />
						</Navbar.Text>
						<Navbar.Text className={styles.pageTitle}>{props.pageName}</Navbar.Text>
					</Container>
				</Navbar>
			)}
		</>
	);
};

export default Header;

/**
 * Redirects the window back to the previous page.
 */
function handlePageReturn() {
	history.back();
}
