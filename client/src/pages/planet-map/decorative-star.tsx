import { Circle } from 'react-konva';

interface Props {
	x: number;
	y: number;
}

export const DecorativeStar = (props: Props) => {
	return (
		<Circle
			perfectDrawEnabled={false}
			fill='white'
			width={1}
			height={1}
			x={props.x}
			y={props.y}
			listening={false}
		/>
	);
};
