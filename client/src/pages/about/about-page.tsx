/* Stylesheet imports */
import styles from './about-page.module.css';

/* Icon imports from react-icons */
import { MdOutlineArrowForwardIos } from 'react-icons/md';

/* Imports from react-bootstrap */
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

/* Imports from other components created */
import Page from '../../components/kebab1/kebab';

/**
 * Constructs and returns the About us page for this website.
 *
 * @returns the About us page as a JSX.Element.
 */
const About = () => {
	return (
		<>
			<Page
				logoHeader={false}
				pageName='About'
				content={
					<div className={`${styles.aboutBody} card rounded-0 p-4 mt-3`}>
						<ListGroup variant='flush'>
							<ListGroup.Item className={`${styles.groupItem}`}>
								<Nav.Link className={styles.groupItemBody} href='/about/policy'>
									<h2>Privacy Policy</h2>
									<MdOutlineArrowForwardIos />
								</Nav.Link>
							</ListGroup.Item>
							<ListGroup.Item className={`${styles.groupItem}`}>
								<Nav.Link className={styles.groupItemBody} href='/about/terms'>
									<h2>Terms of Use</h2>
									<MdOutlineArrowForwardIos />
								</Nav.Link>
							</ListGroup.Item>
							<ListGroup.Item className={`${styles.groupItem}`}>
								<Nav.Link className={styles.groupItemBody} href='/about/about-skynet'>
									<h2>About Skynet</h2>
									<MdOutlineArrowForwardIos />
								</Nav.Link>
							</ListGroup.Item>
						</ListGroup>
					</div>
				}
			/>
		</>
	);
};

/**
 * Exports the About us page for external use.
 */
export default About;
