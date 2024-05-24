import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiCrosshairBold } from 'react-icons/pi';
import { Layer, Stage } from 'react-konva';

import { UserAuthContext } from '../../lib/auth';
import { api } from '../../lib/axios';
import { withRef } from '../../lib/with-ref';
import { CenterVisual } from './center-visual';
import { PlanetVisual } from './planet-visual';
import { SpaceTraveller } from './space-traveller';
import { StarBackground } from './star-background';
import { useLocation } from 'wouter';

export const PlanetMap = () => {
	const stageRef = useRef<Konva.Stage>(null);

	const [_, navigate] = useLocation();

	const [planetData, setPlanetData] = useState<any[]>([]);
	const [homePlanetId, setHomePlanetId] = useState<string>();

	const minZoom = 0.1;
	const maxZoom = 10;
	const [zoom, setZoom] = useState(1);

	const user = useContext(UserAuthContext);

	const getAbsolutePos = (relativePos: Vector2d): Vector2d => {
		const stage = stageRef.current;
		if (!stage) return { x: 0, y: 0 };

		const offset = stage.offset();
		const xOffset = offset.x * (1 - zoom);
		const yOffset = offset.y * (1 - zoom);

		return {
			x: relativePos.x - xOffset,
			y: relativePos.y - yOffset,
		};
	};

	const getRelativePos = (absolutePos: Vector2d): Vector2d => {
		const stage = stageRef.current;
		if (!stage) return { x: 0, y: 0 };

		const offset = stage.offset();
		const xOffset = offset.x * (1 - zoom);
		const yOffset = offset.y * (1 - zoom);

		return {
			x: absolutePos.x + xOffset,
			y: absolutePos.y + yOffset,
		};
	};

	const [absPanPosition, setAbsPanPosition] = useState<Vector2d>({ x: 0, y: 0 });
	const relativePanPosition = useMemo<Vector2d>(() => {
		const stage = stageRef.current;
		if (!stage) return { x: 0, y: 0 };

		return getRelativePos(absPanPosition);
	}, [absPanPosition, zoom]);

	const resetPan = () => {
		withRef(stageRef, (stage) => {
			stage.to({ ...getAbsolutePos({ x: 0, y: 0 }), duration: 0.2 });
		});
	};

	const updatePositionLabel = () => {
		withRef(stageRef, (ref) => {
			const x = Math.round(ref.x());
			const y = Math.round(ref.y());
			setAbsPanPosition({ x, y });
		});
	};

	const updateZoom = () => {
		const stage = stageRef.current;
		if (!stage) return;

		const oldZoom = stage.scaleX();

		const userPointer = stage.getPointerPosition();
		const pointerPos = userPointer ? userPointer : { x: innerWidth / 2, y: innerHeight / 2 };

		const zoomPoint: Vector2d = {
			x: (pointerPos.x - stage.x()) / oldZoom,
			y: (pointerPos.y - stage.y()) / oldZoom,
		};

		stage.to({
			scaleX: zoom,
			scaleY: zoom,
			x: pointerPos.x - zoomPoint.x * zoom,
			y: pointerPos.y - zoomPoint.y * zoom,
			duration: 0.1,
		});
	};

	const updateZoomFromScroll = (kev: Konva.KonvaEventObject<WheelEvent>) => {
		kev.evt.preventDefault();
		const change = kev.evt.deltaY / 1000;
		const newZoom = zoom + -change;
		setZoom(Math.max(minZoom, Math.min(maxZoom, newZoom)));
	};

	useEffect(() => updateZoom(), [zoom]);

	useEffect(
		() =>
			withRef(stageRef, (ref) => {
				ref.on('xChange', updatePositionLabel);
				ref.on('yChange', updatePositionLabel);

				return () => {
					ref.off('xChange', updatePositionLabel);
					ref.off('yChange', updatePositionLabel);
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

	const [secretActive, setSecretActive] = useState(false);
	function displaySecret() {
		if (secretActive) return;
		setSecretActive(true);
		setTimeout(() => setSecretActive(false), 15_000);
	}

	useEffect(() => {
		const secretWord = 'emergency';

		let charIndex = 0;
		let clicks = 0;

		const checkSecretProgress = () => {
			if (secretActive) return;

			if (clicks === 20) {
				displaySecret();
				clicks = 0;
			} else if (charIndex === secretWord.length) {
				displaySecret();
				charIndex = 0;
			}
		};

		const nextChar = (e: KeyboardEvent) => {
			if (e.key.toLowerCase() === secretWord.charAt(charIndex)) {
				charIndex++;
			} else charIndex = 0;

			checkSecretProgress();
		};

		const nextClick = () => {
			clicks++;
			checkSecretProgress();
		};

		document.addEventListener('keydown', nextChar);
		document.addEventListener('click', nextClick);
		return () => {
			document.removeEventListener('keydown', nextChar);
			document.removeEventListener('click', nextClick);
		};
	}, []);

	return (
		<>
			<div className='position-absolute end-0 bottom-0 z-3 p-3 d-flex'>
				<div className='mt-auto ms-auto d-flex gap-3'>
					<p className='mb-0 text-dark-emphasis '>
						X: {-relativePanPosition.x.toFixed(0)}, Y: {relativePanPosition.y.toFixed(0)}, x
						{zoom.toLocaleString()}
					</p>
					<button
						className='btn btn-outline-dark d-flex align-items-center justify-content-center fs-3'
						disabled={relativePanPosition.x === 0 && relativePanPosition.y === 0}
						onClick={() => resetPan()}>
						<PiCrosshairBold />
					</button>

					<button
						className='btn btn-outline-dark d-flex align-items-center justify-content-center fs-3'
						onClick={() => navigate('/home-list')}>
						<GiHamburgerMenu />
					</button>
				</div>
			</div>

			<Stage
				ref={stageRef}
				onWheel={updateZoomFromScroll}
				width={innerWidth}
				height={innerHeight}
				offset={{ x: -innerWidth / 2, y: -innerHeight / 2 }}
				style={{ position: 'absolute', background: 'transparent', zIndex: 1 }}
				draggable>
				<Layer>
					<CenterVisual />
				</Layer>

				<Layer>
					{planetData.map((v) => {
						return <PlanetVisual key={v._id} planet={v} home={homePlanetId === v._id} planetId={v._id} />;
					})}
				</Layer>

				<Layer offset={{ x: innerWidth / 2, y: innerHeight / 2 }}>
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
					<SpaceTraveller active={secretActive} />
				</Layer>
			</Stage>

			<Stage width={innerWidth} height={innerHeight} style={{ position: 'absolute', background: 'black' }}>
				<StarBackground />
			</Stage>
		</>
	);
};
