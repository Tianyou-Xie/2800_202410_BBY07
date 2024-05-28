import styles from './landing-page.module.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { PlanetMap } from '../planet-map/planet-map';

const LandingPage = () => {
	return (
		<>
			<div className={styles.nav}>
				<Navbar expand='lg' className='bg-body-tertiary'>
					<Container className='w-100'>
						<Navbar.Brand href='/'>sky.net</Navbar.Brand>
						<div>
							<button className={`${styles.landingBtn} ${styles.loginBtn} btn btn-primary me-2`} type='submit'>
								Login
							</button>
							<button className={`${styles.landingBtn} ${styles.signupBtn} btn btn-primary ms-2`} type='button'>
								Signup
							</button>
						</div>
					</Container>
				</Navbar>
			</div>
            <div className={styles.planetMap}>
                <PlanetMap />
            </div>
		</>
	);
};

export default LandingPage;
