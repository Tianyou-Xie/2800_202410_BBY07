import styles from './home.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'wouter';

interface PlanetProps {
	planet: string;
	url: string;
}

const Planets = (props: PlanetProps) => {
	return (
		<Link href={props.url} className={styles.planetsLink}>
			<div className={styles.planets}>{props.planet}</div>
		</Link>
	);
};

const Home = () => {
	const mainContainer = (
		<div className='d-flex align-items-center justify-content-center p-3'>
			<div className={styles.mainContainer}>
				<h1 className={styles.title}>Choose your planet</h1>
				<Planets planet='GENERAL FEED' url='/feed' />
				<Planets planet='Earth' url='/feed' />
				<Planets planet='Moon' url='/feed' />
				<Planets planet='Mercury' url='/feed' />
				<Planets planet='Venus' url='/feed' />
				<Planets planet='Mars' url='/feed' />
				<Planets planet='Jupiter' url='/feed' />
				<Planets planet='Saturn' url='/feed' />
				<Planets planet='Uranus' url='/feed' />
				<Planets planet='Neptune' url='/feed' />
			</div>
		</div>
	);

	return <Page content={mainContainer} logoHeader={true} />;
};

export default Home;
