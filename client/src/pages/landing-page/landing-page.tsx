import styles from './landing-page.module.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { PlanetMap } from '../planet-map/planet-map';
import { Scrambler } from '../../components/scrambler/scrambler'
import logoUrl from '../../assets/images/SkynetLogo.png';;

const LandingPage = () => {
	return (
		<>
			<div className={styles.landingDisplay}>
				<div className={styles.nav}>
					<Navbar expand='lg' className='bg-body-tertiary'>
						<Container className={`${styles.navContainer} w-100`}>
							<Navbar.Brand href='/'>
							<img className={styles.logo} src={logoUrl} alt='Skynet Logo' />
								<Scrambler text='sky.net' scrambleSpeed={80} scrambleDelay={6000} />
							</Navbar.Brand>
							<div>
								<button className={`${styles.landingBtn} ${styles.loginBtn} btn me-2`} type='submit'>
									Login
								</button>
								<button className={`${styles.landingBtn} ${styles.signupBtn} btn ms-2`} type='button'>
									Signup
								</button>
							</div>
						</Container>
					</Navbar>
				</div>
				<div className={`${styles.planetMap}`}>
					<div className={styles.backdrop}></div>
					<PlanetMap interactable={false} />
				</div>
				<div className={`${styles.landingHeader} w-100 text-center`}>
					<h1><Scrambler text='Communication Revisioned' scrambleSpeed={80} scrambleDelay={6000} /></h1>
					<h3>Welcome to sky.net</h3>
				</div>
				<div>sadasd</div>
			</div>
		</>
	);
};

export default LandingPage;
