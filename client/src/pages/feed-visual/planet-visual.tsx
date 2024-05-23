import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Circle, Group, Text } from 'react-konva';
import { withRef } from '../../lib/with-ref';
import { useLocation } from 'wouter';
import isMobile from 'is-mobile';

interface Props {
	planet: unknown;
	home: boolean;
}

export const PlanetVisual = ({ planet, home }: Props) => {
	if (!planet || typeof planet !== 'object' || !('visual' in planet)) return;
	const name = 'name' in planet && typeof planet.name === 'string' ? planet.name : 'Unknown Planet';

	const conf = planet.visual;
	if (!conf || typeof conf !== 'object') return;

	const radius = 'radius' in conf && typeof conf.radius === 'number' ? conf.radius : 0;
	const orbitRadius = 'orbitRadius' in conf && typeof conf.orbitRadius === 'number' ? conf.orbitRadius : 0;
	const orbitDuration = 'orbitDuration' in conf && typeof conf.orbitDuration === 'number' ? conf.orbitDuration : 300;

	const [_, navigate] = useLocation();

	const labelRef = useRef<Konva.Text>(null);
	const planetRef = useRef<Konva.Circle>(null);
	const outlineRef = useRef<Konva.Circle>(null);

	const [active, setActive] = useState(isMobile({ tablet: true }));

	const [x, setX] = useState(orbitRadius);
	const [y, setY] = useState(orbitRadius);

	useEffect(() => {
		withRef(labelRef, (label) => {
			label.to({ opacity: active ? 1 : 0, duration: 0.2 });
		});

		withRef(planetRef, (planet) => {
			planet.to({ opacity: active ? 1 : 0.5, duration: 0.2 });
		});

		withRef(outlineRef, (outline) => {
			outline.to({ radius: active ? radius + 10 : radius + 5, duration: 0.2 });
		});

		document.body.style.cursor = active ? 'pointer' : 'unset';
	}, [active]);

	useEffect(() => {
		const planet = planetRef.current;
		if (!planet) return;

		// CREDIT:
		// Orbit was drafted by Colin Cheung (https://jsfiddle.net/ColinCee/a2yu0af6/)
		// I adapted it for my use-case

		let theta = Math.random() * (2 * Math.PI);
		const anim = new Konva.Animation((time) => {
			if (!time) return;

			theta += 1 / (orbitDuration * 2.5);
			if (theta >= 2 * Math.PI) theta = 0;

			const x = orbitRadius * Math.cos(theta);
			const y = -orbitRadius * Math.sin(theta);

			setX(x);
			setY(y);
		}, planet.getLayer());

		anim.start();
		return () => void anim.stop();
	}, []);

	return (
		<>
			<Circle
				offset={{ x: -innerWidth / 2, y: -innerHeight / 2 }}
				stroke='grey'
				strokeWidth={0.1}
				radius={orbitRadius}
				listening={false}
				perfectDrawEnabled={false}
			/>

			<Group offset={{ x: -innerWidth / 2, y: -innerHeight / 2 }} x={x} y={y}>
				<Circle ref={planetRef} fill='white' radius={radius} listening={false} perfectDrawEnabled={false} />

				<Circle
					ref={outlineRef}
					stroke='rgba(148, 148, 148, 0.4)'
					perfectDrawEnabled={false}
					strokeWidth={1}
					radius={radius + 10}
					onTap={() => setActive(!active)}
					onClick={() => navigate(`/feed/${name.toLowerCase()}`)}
					onMouseEnter={() => setActive(true)}
					onMouseLeave={() => setActive(false)}></Circle>

				<Text
					ref={labelRef}
					text={`${home ? "💖 " : ""}${name}`}
					offset={{ x: -radius - 15, y: 16 / 2 }}
					fontFamily='Bitsumishi'
					opacity={0}
					fontSize={16}
					perfectDrawEnabled={false}
					listening={false}
					fill='white'
				/>
			</Group>
		</>
	);
};
