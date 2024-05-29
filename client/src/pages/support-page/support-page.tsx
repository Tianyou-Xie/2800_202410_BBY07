/* Stylesheet imports */
import styles from './support-page.module.css';

/* Icon imports from react-icons */
import { MdOutlineArrowForwardIos } from 'react-icons/md';

/* Imports from react-bootstrap */
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

/* Imports from other components created */
import Page from '../../components/Page/Page';

/**
 * Constructs and returns the About us page for this website.
 *
 * @returns the About us page as a JSX.Element.
 */
const SupportPage = () => {
	return (
		<>
			<Page logoHeader={false} pageName='About' content={<></>} />
		</>
	);
};

/**
 * Exports the about page for external use.
 */
export default SupportPage;
