import styles from './planet-list.module.css';
import { Link } from 'wouter';

/**
 * Interface that represents the arguments passed down to the Planet component.
 *
 * @params Covered on the component documentation.
 */
interface PlanetProps {
	planet: string;
	url: string;
}

/**
 * Planet component representing a planet item from the planet list in
 * the home page
 *
 * @param props.planet
 * @param props.url
 * @return JSX.Element - Planet item as a JSX.Element
 */
const Planet = (props: PlanetProps) => {
	return (
		<Link href={props.url} className={styles.planetsLink}>
			<div className={styles.planets}>{props.planet}</div>
		</Link>
	);
};

/**
 * Exports the Planet component for external use.
 */
export default Planet;
