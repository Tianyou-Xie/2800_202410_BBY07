import styles from './home.module.css';

import Page from '../../components/Page/Page';
import { useContext, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { SmallLoader } from '../../components/loader/small-loader';
import { createSlug } from '../../lib/create-slug';
import { api } from '../../lib/axios';
import { UserAuthContext } from '../../lib/auth';
import Planet from './planet-component';

/**
 * Home component representing the home page in which all the planets are displayed
 * in a list form for better user accessibility.
 *
 * @return JSX.Element - Home page as an JSX.Element
 */
const Home = () => {
	const user = useContext(UserAuthContext);

	const [planetsData, setPlanetsData] = useState<any[]>([]);
	const [homePlanet, setHomePlanet] = useState('');

	/**
	 * Use effect used to update the planets list once the page renders for the first time.
	 */
	useEffect(() => {
		api.get('/planet').then((res) => {
			const { value } = res.data;
			setPlanetsData(value);
		});
	}, []);

	/**
	 * Use effect used to set the home planet of the user once the data of the current
	 * user is received.
	 */
	useEffect(() => {
		setHomePlanet(user.location.planetId);
	}, [user]);

	const mainContainer = (
		<div className='d-flex align-items-center justify-content-center p-3'>
			<div className={styles.mainContainer}>
				<h1 className={styles.title}>Choose your planet</h1>
				<Planet planet='Galactic Feed' url='/feed' />
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

							return (
								<Planet
									planet={homePlanet === planet._id ? `🏠 ${name}` : name}
									url={`/feed/${slug}/${planet._id}`}
								/>
							);
						})}
					</Else>
				</If>
			</div>
		</div>
	);

	return <Page content={mainContainer} logoHeader={true} />;
};

/**
 * Exports the Home component for external use.
 */
export default Home;
