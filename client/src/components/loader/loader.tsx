import styles from './loader.module.css';
import { Scrambler } from '../scrambler/scrambler';

export const Loader = () => {
	const text = 'Loading';

	return (
		<div
			className={`position-absolute w-100 h-100 bg-black d-flex flex-column align-items-center justify-content-center z-3`}>
			<div
				className={` ${styles.loadingText} d-flex align-items-center justify-content-center position-relative display-3 text-white`}>
				<span className='opacity-0'>{text}</span>
				<span className='position-absolute'>
					<Scrambler text={text} />
				</span>
			</div>
		</div>
	);
};
