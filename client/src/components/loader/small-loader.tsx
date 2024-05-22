import styles from './small-loader.module.css';
import { useEffect, useState } from 'react';

export const SmallLoader = () => {
	const initialText = 'Loading';
	const characterSet = ['@', '#', '$', '%', '-', '&', '*', '_'];

	const [text, setText] = useState(initialText);

	useEffect(() => {
		const interval = setInterval(() => {
			const anim = setInterval(() => {
				const randomChar = initialText.charAt(Math.floor(Math.random() * initialText.length));
				const randomCharReplacement = characterSet[Math.floor(Math.random() * characterSet.length)];
				console.log(randomChar, randomCharReplacement);
				setText(initialText.replace(randomChar, randomCharReplacement));
			}, 50);

			setTimeout(() => {
				clearInterval(anim);
				setText(initialText);
			}, 750);
		}, 1000);

		return () => clearInterval(interval);
	});

	return (
		<span className={`${styles.loader} text-black d-flex align-items-center justify-content-center position-relative`}>
			<span className='opacity-0'>{initialText}</span>
			<span className='position-absolute'>{text}</span>
		</span>
	);
};
