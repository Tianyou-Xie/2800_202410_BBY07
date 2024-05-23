import { Vector2d } from 'konva/lib/types';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Layer } from 'react-konva';
import { DecorativeStar } from './decorative-star';
import Konva from 'konva';

interface Props {
	starAmount?: number;
}

export const StarBackground = ({ starAmount = 200 }: Props) => {
	const layerRef = useRef<Konva.Layer>(null);
	const [stars, setStars] = useState<ReactNode[]>([]);

	useEffect(() => {
		const randomVector = () => {
			return {
				x: Math.random() * innerWidth,
				y: Math.random() * innerHeight,
			} satisfies Vector2d;
		};

		const elements = [];

		for (let i = 0; i < starAmount; i++) {
			const vect = randomVector();
			elements.push(<DecorativeStar key={i} {...vect} />);
		}

		setStars(elements);
	}, []);

	useEffect(() => {
		const layer = layerRef.current;
		if (!layer) return;

		const lockLayer = () => {
			layer.x(0);
			layer.y(0);
		};

		layer.on('drag', lockLayer);
		return () => void layer.off('drag', lockLayer);
	}, [layerRef]);

	return <Layer ref={layerRef}>{stars}</Layer>;
};
