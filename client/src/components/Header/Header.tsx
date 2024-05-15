import styles from './Header.module.css';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
	return (
		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>
				<Nav.Link href='#home'><IoArrowBackCircleOutline className={styles.returnIcon} /></Nav.Link>
                <div className=''>
                   <Navbar.Text className={styles.pageName}>SamplePage</Navbar.Text> 
                </div>				
			</Container>
		</Navbar>
	);
};

export default Header;
