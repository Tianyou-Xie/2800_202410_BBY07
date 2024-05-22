import styles from './loader.module.css';

export const Loader = () => {
	return (
		<div className={`w-100 h-100 bg-black d-flex flex-column align-items-center justify-content-center`}>
			<h1 className={`${styles.loadingText} display-4 text-white text-center`}>Loading</h1>
		</div>
	);
};
