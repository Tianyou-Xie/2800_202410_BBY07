import styles from './home.module.css';
import Container from 'react-bootstrap/Container';

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
		<Container className={styles.mainContainer}>
			<div className={styles.title}>Choose your planet</div>
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
		</Container>
	);

	return (
		<html>
			<body>
				<Page content={mainContainer} noHeader />
			</body>
		</html>
	);
};

export default Home;
