import styles from './planets.module.css';

const PlanetsHtml = () => {
	return (
		<div className={styles.planetsContainer}>
			<div className={styles.sun}></div>
			<div className={`${styles.orbit} ${styles.mercuryOrbit}`}>
				<div className={`${styles.planet} ${styles.mercury}`}></div>
			</div>
			<div className={`${styles.orbit} ${styles.venusOrbit}`}>
				<div className={`${styles.planet} ${styles.venus}`}></div>
			</div>
			<div className={`${styles.orbit} ${styles.earthOrbit}`}>
				<div className={`${styles.planet} ${styles.earth}`}></div>
			</div>
			<div className={`${styles.orbit} ${styles.marsOrbit}`}>
				<div className={`${styles.planet} ${styles.mars}`}></div>
			</div>
			<div className={`${styles.orbit} ${styles.jupiterOrbit}`}>
				<div className={`${styles.planet} ${styles.jupiter}`}></div>
			</div>
			<div className={`${styles.orbit} ${styles.saturnOrbit}`}>
				<div className={`${styles.planet} ${styles.saturn}`}></div>
			</div>
			<div className={`${styles.orbit} ${styles.uranusOrbit}`}>
				<div className={`${styles.planet} ${styles.uranus}`}></div>
			</div>
			<div className={`${styles.orbit} ${styles.neptuneOrbit}`}>
				<div className={`${styles.planet} ${styles.neptune}`}></div>
			</div>
			<div className={`${styles.orbit} ${styles.plutoOrbit}`}>
				<div className={`${styles.planet} ${styles.pluto}`}></div>
			</div>
		</div>
	);
};

export default PlanetsHtml;
