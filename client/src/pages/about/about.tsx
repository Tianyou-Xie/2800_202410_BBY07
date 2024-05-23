import styles from './about.module.css';

import { MdOutlineArrowForwardIos } from 'react-icons/md';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Page from '../../components/Page/Page';
import { DiVim } from 'react-icons/di';

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
						</ListGroup>
					</div>
				}
			/>
		</>
	);
};

export default About;
