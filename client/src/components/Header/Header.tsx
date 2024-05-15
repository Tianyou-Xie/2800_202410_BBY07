import styles from './Header.module.css';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface Props {
	pageName: string
}

const Header = (props: Props) => {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Navbar.Text onClick={handlePageReturn}><IoArrowBackCircleOutline className={styles.returnIcon} /></Navbar.Text>
                <Navbar.Text className={styles.pageName}>{props.pageName}</Navbar.Text>			
			</Container>
		</Navbar>
	);
};

export default Header;

function handlePageReturn() {
	history.back();
}