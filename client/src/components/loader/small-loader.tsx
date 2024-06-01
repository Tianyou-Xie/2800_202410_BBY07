import { CSSProperties } from 'react';
import { Scrambler } from '../scrambler/scrambler';
import styles from './small-loader.module.css';

interface Props {
	style?: CSSProperties;
}

export const SmallLoader = (props: Props) => {
	const text = 'Loading';

	return (
		<span
			className={`${styles.loader} w-100 h-100 d-flex align-items-center justify-content-center position-relative`}
			style={props.style}>
			<span className='opacity-0'>{text}</span>
			<span className='position-absolute'>
				<Scrambler style={props.style} text={text} />
			</span>
		</span>
	);
};
