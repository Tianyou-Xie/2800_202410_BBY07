import styles from './cursor.module.css';

const Cursors = () => {
	const cursor = document.querySelector('.cursor');
	document.addEventListener('mousemove', (e) => {
		cursor?.setAttribute('style', 'top: ' + (e.pageY - 14) + 'px; left: ' + (e.pageX - 10) + 'px;');
	});
	document.addEventListener('click', () => {
		cursor?.classList.add('expand');
		setTimeout(() => {
			cursor?.classList.remove('expand');
		}, 500);
	});
	return (
		<>
			<div id='cursor' className={styles.cursor}></div>
		</>
	);
};

export default Cursors;
