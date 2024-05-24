import styles from './test-page.module.css';
import Container from 'react-bootstrap/Container';

import Header from '../../components/Header/Header';
import Hotbar from '../../components/Hotbar/Hotbar';
import Post from '../../components/Post/Post';

// PAGE FOR TESTING COMPONENTS
// Feel free to edit it
const Test = () => {
	return (
		<html>
			<body>
				<Container className={styles.pageContainer}>
					<Header pageName='General feed' />
					<Post username='@MarcusTheDumbs' text='Testing' postURL='./about' />
					<Hotbar />
				</Container>
			</body>
		</html>
	);
};

export default Test;
