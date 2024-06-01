import { CSSProperties, useEffect, useState } from 'react';

interface Props {
	text: string;
	scrambleSpeed?: number;
	scrambleDelay?: number;
	style?: CSSProperties;
}

const scrambleChars = ['@', '#', '$', '%', '-', '&', '*', '_'];

export const Scrambler = (props: Props) => {
	const [text, setText] = useState(props.text);

	useEffect(() => {
		const scrambleSpeed = props.scrambleSpeed ?? 50;
		const allScrambleLength = scrambleSpeed * props.text.length;

		const interval = setInterval(async () => {
			for (let i = 0; i < props.text.length; i++) {
				const replacement = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
				if (i === 0) setText(replacement + props.text.slice(1));
				else setText(props.text.slice(0, i) + replacement + props.text.slice(i + 1));

				await new Promise((res) => setTimeout(res, scrambleSpeed));
				setText(props.text);
			}
		}, allScrambleLength + (props.scrambleDelay ?? 1000));

		return () => clearInterval(interval);
	}, [props.scrambleSpeed, props.scrambleDelay, props.text]);

	return <span style={props.style}>{text}</span>;
};
