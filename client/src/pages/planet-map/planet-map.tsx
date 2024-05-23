import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiCrosshairBold } from 'react-icons/pi';
import { Layer, Stage } from 'react-konva';

import { api } from '../../lib/axios';
import { withRef } from '../../lib/with-ref';
import { CenterVisual } from './center-visual';
import { PlanetVisual } from './planet-visual';
import { StarBackground } from './star-background';
import { UserAuthContext } from '../../lib/auth';

export const PlanetMap = () => {
	const stageRef = useRef<Konva.Stage>(null);

	const [currentPan, setCurrentPan] = useState<Vector2d>({ x: 0, y: 0 });

	const [planetData, setPlanetData] = useState<any[]>([]);
	const [homePlanetId, setHomePlanetId] = useState<string>();

	const user = useContext(UserAuthContext);

	const resetPan = () =>
		withRef(stageRef, (stage) => {
			stage.to({ x: 0, y: 0, duration: 0.2 });
		});

	const updatePos = () => {
		withRef(stageRef, (ref) => {
			const x = Math.round(ref.x());
			const y = Math.round(ref.y());
			setCurrentPan({ x, y });
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
		api.get('/planet')
			.then(({ data: res }) => {
				const planets = res.value;
				if (!Array.isArray(planets)) return;
				setPlanetData(planets);
			})
			.catch();
	}, []);

	useEffect(() => {
		if (!user) return;
		setHomePlanetId(user.location.planetId);
	}, [user]);

	return (
		<>
			<div className='position-absolute end-0 bottom-0 z-3 p-3 d-flex'>
				<div className='mt-auto ms-auto d-flex gap-3'>
					<p className='mb-0'>
						X: {currentPan.x}, Y: {currentPan.y}
					</p>
					<button
						className='btn btn-outline-dark d-flex align-items-center justify-content-center fs-3'
						disabled={currentPan.x === 0 && currentPan.y === 0}
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

				<Layer>
					{planetData.map((v) => {
						return <PlanetVisual key={v._id} planet={v} home={homePlanetId === v._id} />;
					})}
				</Layer>
			</Stage>

			<Stage width={innerWidth} height={innerHeight} style={{ position: 'absolute', background: 'black' }}>
				<StarBackground />
			</Stage>
		</>
	);
};
