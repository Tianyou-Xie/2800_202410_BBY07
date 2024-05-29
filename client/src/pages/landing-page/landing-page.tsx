import styles from './landing-page.module.css';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { PlanetMap } from '../planet-map/planet-map';
import { Scrambler } from '../../components/scrambler/scrambler';
import { IoMdArrowDown } from 'react-icons/io';
import { useLocation } from 'wouter';
import logoUrl from '../../assets/images/SkynetLogo.png';
import homeURL from '../../assets/videos/home.gif';
import postURL from '../../assets/videos/post.gif';

const LandingPage = () => {
	const [_, setLocation] = useLocation();

	const moveDisplay = (id: string) => {
		document.getElementById(id)?.scrollIntoView();
	};

	const redirect = (path: string) => {
		setLocation(path);
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
								<button
									className={`${styles.landingBtn} ${styles.loginBtn} btn me-2`}
									type='button'
									onClick={() => redirect('/login')}>
									Login
								</button>
								<button
									className={`${styles.landingBtn} ${styles.signupBtn} btn ms-2`}
									type='button'
									onClick={() => redirect('/signup')}>
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

					<div className='row featurette d-flex justify-content-between'>
						<div
							className={`${styles.featureDesc} col-md-7 mb-3 text-center d-flex justify-content-center align-items-center`}>
							<div>
								<h2 className={`${styles.featureHeader}`}>Interactable Planets and Galaxies</h2>
								<p className='lead'>
									Dive into SKY.NET and see social media redesigned for ou modern space age. With a
									homepage structured around your galaxy, you can feel even closer to your friends and
									family amongst the stars.
								</p>
							</div>
						</div>
						<div className='col-md-5 d-flex justify-content-center align-items-center'>
							<img
								className={`${styles.featureImg} bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto`}
								width={500}
								height={500}
								src={homeURL}
								alt='Home gif'
							/>
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
									Letting you keep up with others in realtime no matter how are they are.
								</p>
							</div>
						</div>
						<div className='col-md-5 d-flex justify-content-center align-items-center'>
							<img
								className={`${styles.featureImg} bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto`}
								width={500}
								height={500}
								src={homeURL}
								alt='Home gif'
							/>
						</div>
					</div>

					<hr className='featurette-divider' />

					<div className='row featurette d-flex justify-content-between'>
						<div
							className={`${styles.featureDesc} col-md-7 mb-3 text-center d-flex justify-content-center align-items-center`}>
							<div>
								<h2 className={`${styles.featureHeader} text-center`}>sky.net Connects All</h2>
								<p className='lead text-center'>
									With SKY.NET feeds you can see what is going on in your planet, other planets, and
									even the whole galaxy.
								</p>
							</div>
						</div>
						<div className='col-md-5 d-flex justify-content-center align-items-center'>
							<img
								className={`${styles.featureImg} bd-placeholder-img bd-placeholder-img-lg mx-auto`}
								width={400}
								height={600}
								src={postURL}
								alt='Post gif'
							/>
						</div>
					</div>

					<hr className='featurette-divider' />
				</div>
			</div>
		</>
	);
};

export default LandingPage;
