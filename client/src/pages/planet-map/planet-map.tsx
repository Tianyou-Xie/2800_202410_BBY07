import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import React, { useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiCrosshairBold } from 'react-icons/pi';
import { Layer, Stage } from 'react-konva';

import { api } from '../../lib/axios';
import { withRef } from '../../lib/with-ref';
import { CenterVisual } from './center-visual';
import { PlanetVisual } from './planet-visual';
import { StarBackground } from './star-background';

export const PlanetMap = () => {
	const stageRef = useRef<Konva.Stage>(null);

	const [currPos, setCurrPos] = useState<Vector2d>({ x: 0, y: 0 });
	const [homePlanet, setHomePlanet] = useState<string>();
	const [planets, setPlanets] = useState<React.ReactNode[]>([]);

	const resetPan = () =>
		withRef(stageRef, (stage) => {
			stage.to({ x: 0, y: 0, duration: 0.2 });
		});

	const updatePos = () => {
		withRef(stageRef, (ref) => {
			const x = Math.round(ref.x());
			const y = Math.round(ref.y());
			setCurrPos({ x, y });
		});
	};

	useEffect(
		() =>
			withRef(stageRef, (ref) => {
				ref.on('xChange', updatePos);
				ref.on('yChange', updatePos);

				return () => {
					ref.off('xChange', updatePos);
					ref.off('yChange', updatePos);
				};
			}),
		[],
	);

	useEffect(() => {
		api.get('/user')
			.then(({ data: res }) => {
				const location = res.value?.location;
				if (!location || typeof location !== 'object' || !('planetId' in location)) return;

				const planetId = location.planetId;
				console.log(planetId);
				if (typeof planetId === 'string') setHomePlanet(location.planetId);
			})
			.catch();

		api.get('/planet')
			.then(({ data: res }) => {
				const planets = res.value;
				if (!Array.isArray(planets)) return;

				const elements = [];
				for (const planet of planets) {
					elements.push(<PlanetVisual key={planet._id} planet={planet} home={homePlanet === planet._id} />);
				}
				setPlanets(elements);
			})
			.catch();
	}, []);

	return (
		<>
			<div className='position-absolute end-0 bottom-0 z-3 p-3 d-flex'>
				<div className='mt-auto ms-auto d-flex gap-3'>
					<p className='mb-0'>
						X: {currPos.x}, Y: {currPos.y}
					</p>
					<button
						className='btn btn-outline-dark d-flex align-items-center justify-content-center fs-3'
						disabled={currPos.x === 0 && currPos.y === 0}
						onClick={() => resetPan()}>
						<PiCrosshairBold />
					</button>

					<button className='btn btn-outline-dark d-flex align-items-center justify-content-center fs-3'>
						<GiHamburgerMenu />
					</button>
				</div>
			</div>

			<Stage
				ref={stageRef}
				width={innerWidth}
				height={innerHeight}
				style={{ position: 'absolute', background: 'transparent', zIndex: 1 }}
				draggable
				onDragMove={() =>
					withRef(stageRef, (stage) => {
						const x = stage.x();
						const y = stage.y();
						stage.x(Math.max(-innerWidth * 2, Math.min(x, innerWidth * 2)));
						stage.y(Math.max(-innerHeight * 2, Math.min(y, innerHeight * 2)));
					})
				}>
				<Layer width={innerWidth} height={innerHeight}>
					<CenterVisual />
				</Layer>

				<Layer>{planets}</Layer>
			</Stage>

			<Stage width={innerWidth} height={innerHeight} style={{ position: 'absolute', background: 'black' }}>
				<StarBackground />
			</Stage>
		</>
	);
};
