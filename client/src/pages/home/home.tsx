import styles from './home.module.css';

import Page from '../../components/Page/Page';
import { Link } from 'wouter';
import React, { useContext, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { SmallLoader } from '../../components/loader/small-loader';
import { createSlug } from '../../lib/create-slug';
import { api } from '../../lib/axios';
import { UserAuthContext } from '../../lib/auth';

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
	const user = useContext(UserAuthContext);

	const [planetsData, setPlanetsData] = useState<any[]>([]);
	const [homePlanet, setHomePlanet] = useState('');

	useEffect(() => {
		api.get('/planet').then((res) => {
			const { value } = res.data;
			setPlanetsData(value);
		});
	}, []);

	useEffect(() => {
		setHomePlanet(user.location.planetId);
	}, [user]);

	const mainContainer = (
		<div className='d-flex align-items-center justify-content-center p-3'>
			<div className={styles.mainContainer}>
				<h1 className={styles.title}>Choose your planet</h1>
				<Planets planet='Galactic Feed' url='/feed' />
				<If condition={planetsData.length === 0}>
					<Then>
						<SmallLoader />
					</Then>
					<Else>
						{planetsData.map((planet) => {
							const name = planet.name;
							if (typeof name !== 'string') return <></>;

							const slug = createSlug(name);
							if (typeof slug !== 'string') return <></>;

							console.log(planet);

							return (
								<Planets
									planet={homePlanet === planet._id ? `🏠 ${name}` : name}
									url={`/feed/${slug}/${planet._id}`}
								/>
							);
						})}
					</Else>
				</If>
				{/* <Planets planet='GENERAL FEED' planetId='/feed' />
				<Planets planet='Earth' planetId='664399a3036de6e77d00332f' />
				<Planets planet='Mercury' planetId='66439add036de6e77d003330' />
				<Planets planet='Venus' planetId='66439af3036de6e77d003331' />
				<Planets planet='Mars' planetId='66439b04036de6e77d003332' />
				<Planets planet='Jupiter' planetId='66439b0e036de6e77d003333' />
				<Planets planet='Saturn' planetId='66439b34036de6e77d003334' />
				<Planets planet='Uranus' planetId='66439b3a036de6e77d003335' />
				<Planets planet='Neptune' planetId='66439b41036de6e77d003336' />
				<Planets planet='Xenos-Prime' planetId='665005bbaac7a8f6c7fa1d1c' /> */}
			</div>
		</div>
	);

	return <Page content={mainContainer} logoHeader={true} />;
};

export default Home;
