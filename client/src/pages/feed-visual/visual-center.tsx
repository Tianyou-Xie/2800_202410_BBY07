import { useEffect, useRef, useState } from 'react';
import { Group, Image, Text } from 'react-konva';
import logoUrl from '../../assets/images/SkynetLogo.png';
import Konva from 'konva';
import { withRef } from '../../lib/with-ref';
import { useLocation } from 'wouter';

export const VisualCenter = () => {
	const [_, navigate] = useLocation();

	const imgRef = useRef<Konva.Image>(null);

	const [img, setImg] = useState<HTMLImageElement>();

	const imageSize = 100;
	const [active, setActive] = useState(false);

	useEffect(() => {
		const el = document.createElement('img');
		el.src = logoUrl;
		setImg(el);
	}, []);

	useEffect(() => {
		withRef(imgRef, (img) => {
			img.to({ shadowBlur: active ? 15 : 5, duration: 0.25 });
		});

		document.body.style.cursor = active ? 'pointer' : 'unset';
	}, [active]);

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
					onTap={() => setActive(true)}
					onClick={() => {
						setActive(true);
						navigate('/home');
					}}
					offset={{ x: imageSize / 2, y: imageSize / 2 }}
				/>
			</Group>
		</>
	);
};
