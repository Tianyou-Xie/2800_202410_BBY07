import styles from './landing-page.module.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { PlanetMap } from '../planet-map/planet-map';
import { Scrambler } from '../../components/scrambler/scrambler';
import { IoMdArrowDown } from 'react-icons/io';
import logoUrl from '../../assets/images/SkynetLogo.png';

const LandingPage = () => {
	const moveDisplay = (id: string) => {
		document.getElementById(id)?.scrollIntoView();
	};

	return (
		<>
			<div id='section1' className={styles.landingDisplay}>
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
					<div className={styles.mapContainer}>
						<div className={styles.backdrop}></div>
						<PlanetMap interactable={false} />
						<div className={`${styles.landingHeader} w-100 text-center`}>
							<h1>
								<Scrambler text='Communication Revisioned' scrambleSpeed={80} scrambleDelay={6000} />
							</h1>
							<h3>Welcome to sky.net</h3>
							<p>No matter the distance. No matter the time. We all can stay connected.</p>
						</div>
						<div className={styles.arrowIcon} onClick={() => moveDisplay('section2')}>
							<IoMdArrowDown />
						</div>
					</div>
				</div>

				<div id='section2'>
					<hr className='featurette-divider' />

					<div className='row featurette'>
						<div className={`${styles.featureDesc} col-md-7`}>
							<h2 className={`${styles.featureHeader} text-center`}>Interactable Planets and Galaxies</h2>
							<div className=''>
								<p className='lead text-center'>
									Dive into SKY.NET and see social media redesigned for ou modern space age. With a
									homepage structured around your galaxy, you can feel even closer to your friends and
									family amongst the stars.
								</p>
							</div>
						</div>
						<div className='col-md-5'>
							{/* <svg
								className='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto'
								width='500'
								height='500'
								xmlns='http://www.w3.org/2000/svg'
								role='img'
								aria-label='Placeholder: 500x500'
								preserveAspectRatio='xMidYMid slice'
								focusable='false'>
								<title>Placeholder</title>
								<rect width='100%' height='100%' fill='var(--bs-secondary-bg)' />
								<text x='50%' y='50%' fill='var(--bs-secondary-color)' dy='.3em'>
									500x500
								</text>
							</svg> */}
						</div>
					</div>

					<hr className='featurette-divider' />

					<div className='row featurette'>
						<div className={`${styles.featureDescFlip} col-md-7 order-md-2`}>
							<h2 className={`${styles.featureHeader} text-center`}>
								Need to talk to someone planets or even light years away?
							</h2>
							<div className=''>
								<p className='lead text-center'>
									SKY.NET offers messaging services that let you send interplanetary messages freely.
									Letting you keep up with others in realtime.
								</p>
							</div>
						</div>
						<div className='col-md-5 order-md-1'>
							{/* <svg
								className='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto'
								width='500'
								height='500'
								xmlns='http://www.w3.org/2000/svg'
								role='img'
								aria-label='Placeholder: 500x500'
								preserveAspectRatio='xMidYMid slice'
								focusable='false'>
								<title>Placeholder</title>
								<rect width='100%' height='100%' fill='var(--bs-secondary-bg)' />
								<text x='50%' y='50%' fill='var(--bs-secondary-color)' dy='.3em'>
									500x500
								</text>
							</svg> */}
						</div>
					</div>

					<hr className='featurette-divider' />

					<div className='row featurette'>
						<div className={`${styles.featureDesc} col-md-7`}>
							<h2 className={`${styles.featureHeader} text-center`}>
								sky.net makes time feel irrelevant
							</h2>
							<div className=''>
								<p className='lead text-center'>
									SKY.NET aims to provide instantaneous connection between individials no matter how
									far they are or what time it is. With SKY.NET feeds you can see what is going on in
									your planet, other planets, and even the whole galaxy.
								</p>
							</div>
						</div>
						<div className='col-md-5'>
							{/* <svg
								className='bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto'
								width='500'
								height='500'
								xmlns='http://www.w3.org/2000/svg'
								role='img'
								aria-label='Placeholder: 500x500'
								preserveAspectRatio='xMidYMid slice'
								focusable='false'>
								<title>Placeholder</title>
								<rect width='100%' height='100%' fill='var(--bs-secondary-bg)' />
								<text x='50%' y='50%' fill='var(--bs-secondary-color)' dy='.3em'>
									500x500
								</text>
							</svg> */}
						</div>
					</div>

					<hr className='featurette-divider' />
				</div>
			</div>
		</>
	);
};

export default LandingPage;
