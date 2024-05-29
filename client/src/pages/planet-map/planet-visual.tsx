import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Circle, Group, Image } from 'react-konva';
import useImage from 'use-image';
import { useLocation } from 'wouter';

import { isMobile } from '../../environment';
import { withRef } from '../../lib/with-ref';
import { PlanetInfoCard } from './planet-info-card';
import { createSlug } from '../../lib/create-slug';

interface Props {
	planet: unknown;
	planetId: string;
	home: boolean;
	interactable: boolean;
}

export const PlanetVisual = ({ planet, home, planetId, interactable }: Props) => {
	if (!planet || typeof planet !== 'object' || !('visual' in planet)) return;
	const name = 'name' in planet && typeof planet.name === 'string' ? planet.name : 'Unknown Planet';

	const conf = planet.visual;
	if (!conf || typeof conf !== 'object') return;

	const radius = 'radius' in conf && typeof conf.radius === 'number' ? conf.radius : 0;
	const orbitRadius = 'orbitRadius' in conf && typeof conf.orbitRadius === 'number' ? conf.orbitRadius : 0;
	const orbitDuration = 'orbitDuration' in conf && typeof conf.orbitDuration === 'number' ? conf.orbitDuration : 300;
	const imageUrl = 'imageUrl' in conf && typeof conf.imageUrl === 'string' ? conf.imageUrl : '';

	const [_, navigate] = useLocation();

	const planetGroupRef = useRef<Konva.Group>(null);
	const [planetRef, setPlanetRef] = useState<Konva.Image | Konva.Circle | null>(null);
	const labelRef = useRef<Konva.Text>(null);
	const outlineRef = useRef<Konva.Circle>(null);

	const [planetImg, planetImgStatus] = useImage(imageUrl);

	const [active, setActive] = useState(interactable ? isMobile : false);
	const [cardType, setCardType] = useState<'preview' | 'expanded'>(isMobile ? 'preview' : 'expanded');

	const [x, setX] = useState(orbitRadius);
	const [y, setY] = useState(orbitRadius);

	useEffect(() => {
		withRef(labelRef, (label) => {
			label.to({ opacity: active ? 1 : 0, duration: 0.2 });
		});

		if (planetRef && planetRef.getLayer()) {
			planetRef.to({ opacity: active ? 1 : 0.8, duration: 0.2 });
		}

		withRef(outlineRef, (outline) => {
			outline.to({ radius: active ? (radius + 5) * 1.2 : radius + 5, duration: 0.2 });
		});

		document.body.style.cursor = active ? 'pointer' : 'unset';
	}, [active, planetRef]);

	useEffect(() => {
		const planetGroup = planetGroupRef.current;
		if (!planetGroup) return;

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
		}, planetGroup.getLayer());

		anim.start();
		return () => void anim.stop();
	}, []);

	const [imageRatio, setImageRatio] = useState(1);

	useEffect(() => {
		if (!planetImg) return;
		const ratio = planetImg.naturalWidth / planetImg.naturalHeight;
		setImageRatio(ratio);
	}, [planetImg]);

	const goToFeed = () => navigate(`/feed/${createSlug(name)}/${planetId}`);

	return (
		<>
			<Circle
				stroke={home ? 'green' : 'grey'}
				strokeWidth={0.1}
				radius={orbitRadius}
				listening={false}
				perfectDrawEnabled={false}
			/>

			<Group ref={planetGroupRef} x={x} y={y}>
				<If condition={planetImgStatus === 'loaded'}>
					<Then>
						<Image
							ref={(ref) => setPlanetRef(ref)}
							offset={{ x: radius * imageRatio, y: radius }}
							image={planetImg}
							width={radius * 2 * imageRatio}
							height={radius * 2}
							listening={false}
							perfectDrawEnabled={false}
						/>
					</Then>
					<Else>
						<Circle
							ref={(ref) => setPlanetRef(ref)}
							fill='white'
							radius={radius}
							listening={false}
							perfectDrawEnabled={false}
						/>
					</Else>
				</If>

				<Circle
					ref={outlineRef}
					stroke='rgba(148, 148, 148, 0.4)'
					perfectDrawEnabled={false}
					strokeWidth={1}
					radius={radius + 10}
					onTap={() => {
						if (!active) {
							setActive(true);
							setCardType('preview');
						} else if (cardType === 'preview') {
							setCardType('expanded');
						} else setActive(!active);
					}}
					listening={interactable}
					onClick={goToFeed}
					onMouseEnter={() => setActive(true)}
					onMouseLeave={() => setActive(false)}
				/>

				<PlanetInfoCard
					planet={planet}
					home={home}
					offset={{ x: -(radius + 5) * 1.2 - 5, y: 0 }}
					active={active}
					type={cardType}
					onTap={goToFeed}
				/>
			</Group>
		</>
	);
};
