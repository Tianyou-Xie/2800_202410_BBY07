/* Stylesheet imports */
import styles from './landing-page.module.css';

/* Import from wouter */
import { useLocation } from 'wouter';

/* Imports from React */
import { useRef } from 'react';

/* Imports from react-bootstrap */
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

/* Icon imports from react-icons */
import { IoMdArrowDown } from 'react-icons/io';
import { IoArrowUpSharp } from 'react-icons/io5';

/* Imports from other components created */
import { PlanetMap } from '../planet-map/planet-map';
import { Scrambler } from '../../components/scrambler/scrambler';

/* Imports from this website's assets */
import logoUrl from '../../assets/images/skynet-logo.png';
import homeURL from '../../assets/videos/home.gif';
import postURL from '../../assets/videos/post.gif';
import messageURL from '../../assets/videos/message.gif';

/**
 * Constructs, manages, and returns the Landing page.
 *
 * @returns returns the landing page as a JSX.Element.
 */
const LandingPage = () => {
	const [_, setLocation] = useLocation();
	const upArrow = useRef<HTMLDivElement>(null);

	/* An event listener for the scroll event of the window */
	document.addEventListener('scroll', () => {
		updateArrow(window.scrollY);
	});

	/**
	 * Adjusts the current scroll view to the given element id.
	 *
	 * @param id the id of the element to scroll into view.
	 */
	const moveDisplay = (id: string) => {
		document.getElementById(id)?.scrollIntoView();
	};

	/**
	 * Redirects to the given page.
	 *
	 * @param path  the path to redirect to.
	 */
	const redirect = (path: string) => {
		setLocation(path);
	};

	/**
	 * Updates the visibility of the arrow up element of this landing page based upon the scroll-y position of the window.
	 *
	 * @param position the current position of the page view in the y-direction.
	 */
	const updateArrow = (position: number) => {
		if (position > 0) {
			upArrow.current?.toggleAttribute('hidden', false);
		} else {
			upArrow.current?.toggleAttribute('hidden', true);
		}
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
									Log in
								</button>
								<button
									className={`${styles.landingBtn} ${styles.signupBtn} btn ms-2`}
									type='button'
									onClick={() => redirect('/signup')}>
									Sign up
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
								<Scrambler text='Communication Re-envisioned' scrambleSpeed={50} scrambleDelay={6000} />
							</h1>
							<h3>Welcome to sky.net</h3>
							<p>No matter the distance. No matter the time. We all can stay connected.</p>
						</div>
						<div className={styles.arrowIcon1} onClick={() => moveDisplay('section2')}>
							<IoMdArrowDown />
						</div>
					</div>
				</div>

				<div className={styles.section2} id='section2'>
					<hr />

					<div className='row featurette'>
						<div
							className={`${styles.featureDesc} col-md-7 mb-3 text-center d-flex justify-content-center align-items-center`}>
							<div className='p-4'>
								<h2 className={`${styles.featureHeader}`}>Interactable Planets and Galaxies</h2>
								<p className='lead'>
									Dive into SKY.NET and see social media redesigned for our modern space age. With a
									homepage structured around your galaxy, you can feel even closer to your friends and
									family amongst the stars.
								</p>
							</div>
						</div>
						<div className='col-md-5 d-flex justify-content-center align-items-center'>
							<img
								className={`${styles.featureImg} bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto`}
								src={homeURL}
								alt='Home gif'
							/>
						</div>
					</div>

					<hr />

					<div className='row featurette d-flex justify-content-between'>
						<div
							className={`${styles.featureDescFlip} col-md-7 order-md-2 mb-3 text-center d-flex justify-content-center align-items-center`}>
							<div className='p-4'>
								<h2 className={`${styles.featureHeader} text-center`}>
									Need to talk to someone planets or even light years away?
								</h2>
								<div className=''>
									<p className='lead text-center'>
										SKY.NET offers messaging services that let you send interplanetary messages
										freely. Letting you keep up with others in real-time no matter how far they are.
									</p>
								</div>
							</div>
						</div>
						<div className='col-md-5 d-flex justify-content-center align-items-center'>
							<img
								className={`${styles.featureImg} bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto`}
								width={400}
								height={600}
								src={messageURL}
								alt='Message gif'
							/>
						</div>
					</div>

					<hr />

					<div className='row featurette d-flex justify-content-between'>
						<div
							className={`${styles.featureDesc} col-md-7 mb-3 text-center d-flex justify-content-center align-items-center`}>
							<div className='p-4'>
								<h2 className={`${styles.featureHeader} text-center`}>sky.net Connects All</h2>
								<p className='lead text-center'>
									With SKY.NET feeds you can see what is going on in your planet, other planets, and
									even the whole galaxy. Always stay up to date with popular opinions and discussions.
								</p>
							</div>
						</div>
						<div className='col-md-5 d-flex justify-content-center align-items-center'>
							<img
								className={`${styles.featureImg} bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto`}
								width={400}
								height={600}
								src={postURL}
								alt='Post gif'
							/>
						</div>
					</div>

					<hr />

					<div className={`${styles.joinMsg} w-75 text-center p-5 mx-auto mb-5`}>
						<h4>Join sky.net now</h4>
						<h5>The future of connection is here.</h5>
						<button
							className={`${styles.landingBtn} ${styles.signupBtn} btn mt-2`}
							type='button'
							onClick={() => redirect('/signup')}>
							Signup
						</button>
					</div>

					<hr />

					<div
						className={`${styles.arrowIcon2} justify-content-center align-items-center`}
						onClick={() => moveDisplay('section1')}
						ref={upArrow}
						hidden>
						<IoArrowUpSharp />
					</div>
				</div>
			</div>
		</>
	);
};

/**
 * Exports the Landing page for external use.
 */
export default LandingPage;
