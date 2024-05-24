import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Group, Image } from 'react-konva';
import { useLocation } from 'wouter';

import logoUrl from '../../assets/images/SkynetLogo.png';
import { withRef } from '../../lib/with-ref';
import useImage from 'use-image';

export const CenterVisual = () => {
	const [_, navigate] = useLocation();

	const imgRef = useRef<Konva.Image>(null);
	const [img] = useImage(logoUrl);
	const imageSize = 100;

	const [active, setActive] = useState(false);

	useEffect(() => {
		withRef(imgRef, (img) => {
			img.to({ shadowBlur: active ? 15 : 5, duration: 0.25 });
		});

		document.body.style.cursor = active ? 'pointer' : 'unset';
	}, [active]);

	const goToFeed = () => navigate('/feed');

	return (
		<>
			<Group offset={{ x: -innerWidth / 2, y: -innerHeight / 2 }}>
				<Image
					ref={imgRef}
					image={img}
					width={imageSize}
					height={imageSize}
					shadowEnabled
					strokeEnabled={false}
					shadowColor='grey'
					perfectDrawEnabled={false}
					onMouseEnter={() => setActive(true)}
					onMouseLeave={() => setActive(false)}
					onTap={goToFeed}
					onClick={goToFeed}
					offset={{ x: imageSize / 2, y: imageSize / 2 }}
				/>
			</Group>
		</>
	);
};
