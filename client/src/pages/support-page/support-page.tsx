/* Stylesheet imports */
import styles from './support-page.module.css';

/* Imports from other components created */
import Page from '../../components/Page/Page';
import { Container } from 'react-bootstrap';

/**
 * Constructs and returns the Support page for this website in which users
 * can contact someone in case of any errors while using the website.
 *
 * @returns the Support page as a JSX.Element.
 */
const SupportPage = () => {
	return (
		<>
			<Page
				logoHeader={false}
				pageName='Support'
				content={
					<Container className={styles.panel}>
						<h1>Sky.net support</h1>
						<p>We are sad to see you had a problem with Sky.net. 😥</p>
						<br />
						<p>
							Please check our <a href='/faqs'>FAQ (Frequently Asked Questions) page</a> first as your
							request or problem may have already been answered by one of our professionals before.
						</p>
						<p>
							If you could not find your problem on FAQ or you have any other problems, technical issues
							or questions, feel free to contact us using our support contact:
						</p>
						<ul>
							<li>
								Email:
								<a href='mailto:support@skynetwork.app'> support@skynetwork.app</a>
							</li>
							<li>Phone number: +1 (236)555-5555*</li>
						</ul>
						<br />
						<br />
						<br />
						<br />
						<p>
							<small>*Phone call support only in Canada.</small>
						</p>
					</Container>
				}
			/>
		</>
	);
};

/**
 * Exports the Support page for external use.
 */
export default SupportPage;
