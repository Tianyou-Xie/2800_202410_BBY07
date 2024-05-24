import Konva from 'konva';
import { useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';

interface Props {
	active: boolean;
}

const sprites = import.meta.glob('../../assets/images/amongus-*.webp');

export const SpaceTraveller = (props: Props) => {
	const ref = useRef<Konva.Image>(null);
	const [underlyingImage, setUnderlyingImage] = useState<HTMLImageElement>();

	const initSize = 48;

	useEffect(() => {
		const possibleImages = Object.entries(sprites);
		const selectedImage = possibleImages[Math.floor(Math.random() * possibleImages.length)];
		selectedImage[1]().then((mod) => {
			if (!mod || typeof mod !== 'object' || !('default' in mod)) return;

			const imgUrl = mod.default;
			if (typeof imgUrl !== 'string') return;

			const img = document.createElement('img');
			img.src = imgUrl;
			setUnderlyingImage(img);
		});
	}, []);

	useEffect(() => {
		const img = ref.current;
		if (!img) return;

		if (!props.active) return;

		const speed = Math.random();

		img.x(-initSize);
		img.y(Math.random() * innerHeight);
		img.to({ scaleX: 1, scaleY: 1, duration: 2 });

		const anim = new Konva.Animation((frame) => {
			if (!frame) return;
			img.x(img.x() + speed);
			img.rotate(0.15);
		}, img.getLayer());

		anim.start();

		return () => {
			const stopSeconds = 2;
			img.to({ scaleX: 0, scaleY: 0, duration: stopSeconds });
			setTimeout(() => anim.stop(), stopSeconds * 1000);
		};
	}, [props.active]);

	return (
		<Image
			scaleY={0}
			scaleX={0}
			listening={false}
			perfectDrawEnabled={false}
			shadowColor='white'
			shadowBlur={10}
			ref={ref}
			width={initSize}
			height={initSize}
			image={underlyingImage}
		/>
	);
};
