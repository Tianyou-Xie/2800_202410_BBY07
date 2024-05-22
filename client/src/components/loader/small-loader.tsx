import { Scrambler } from '../scrambler/scrambler';
import styles from './small-loader.module.css';

export const SmallLoader = () => {
	const text = 'Loading';

	return (
		<span
			className={`${styles.loader} w-100 h-100 text-black d-flex align-items-center justify-content-center position-relative`}>
			<span className='opacity-0'>{text}</span>
			<span className='position-absolute'>
				<Scrambler text={text} />
			</span>
		</span>
	);
};
