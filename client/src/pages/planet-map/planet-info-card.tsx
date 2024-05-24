import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { useEffect, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { Group, Rect, Text } from 'react-konva';

import { withRef } from '../../lib/with-ref';

interface Props {
	planet: unknown;
	home: boolean;
	offset: Vector2d;
	active: boolean;
	type: 'preview' | 'expanded';
	onTap: () => void;
}

export const PlanetInfoCard = (props: Props) => {
	const planet = props.planet;
	if (!planet || typeof planet !== 'object') return <></>;

	const name = 'name' in planet ? `${planet.name}` : 'Unknown Planet';

	const groupRef = useRef<Konva.Group>(null);
	const [activeTextGroup, setActiveTextGroup] = useState<Konva.Group | null>(null);

	const [bgHeight, setBgHeight] = useState(0);
	const [bgWidth, setBgWidth] = useState(0);
	const [bgPadding] = useState(20);

	useEffect(() => {
		withRef(groupRef, (group) => group.to({ opacity: props.active ? 1 : 0, duration: 0.2 }));
		document.body.style.cursor = props.active ? 'pointer' : 'unset';
	}, [props.active]);

	const adjustTextBoxSize = () => {
		const group = activeTextGroup;
		if (!group) return;

		const groupSize = group.getClientRect();
		setBgHeight(groupSize.height + bgPadding);
		setBgWidth(groupSize.width + bgPadding);
	};

	useEffect(adjustTextBoxSize, [activeTextGroup, bgPadding]);

	const planetName = (additionalProps?: Konva.TextConfig) => (
		<Text
			{...additionalProps}
			text={`${props.home ? '🏠 ' : ''}${name}`}
			fontFamily='Bitsumishi'
			fontSize={16}
			perfectDrawEnabled={false}
			listening={false}
			fill='white'
		/>
	);

	return (
		<Group ref={groupRef} opacity={0} offset={{ x: props.offset.x, y: props.offset.y + bgHeight / 2 }}>
			<Rect
				width={bgWidth}
				fill='#5fb7cf'
				opacity={0.25}
				cornerRadius={8}
				height={bgHeight}
				perfectDrawEnabled={false}
				listening={props.active}
				onTap={props.onTap}
			/>

			<If condition={props.type === 'expanded'}>
				<Then>
					<Group
						ref={(ref) => setActiveTextGroup(ref)}
						offset={{ y: -bgPadding / 2, x: -bgPadding / 2 }}
						listening={false}>
						{planetName({ textDecoration: 'underline' })}

						<Text
							text={`Click to view the ${name} feed`}
							y={25}
							fill='white'
							perfectDrawEnabled={false}
							listening={false}
						/>
					</Group>
				</Then>
				<Else>
					<Group
						ref={(ref) => setActiveTextGroup(ref)}
						offset={{ y: -bgPadding / 2, x: -bgPadding / 2 }}
						listening={false}>
						{planetName()}
					</Group>
				</Else>
			</If>
		</Group>
	);
};
