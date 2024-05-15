import styles from './Hotbar.module.css';
import './hotbar.css';

import { GoHomeFill } from "react-icons/go";
import { IoMdPerson } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

const Hotbar = () => {

	function toggleMenu() {
		let menuIcon = document.getElementById("menu-icon");
		let closeIcon = document.getElementById("close-icon");

		if (menuIcon !== null && closeIcon !== null) {
			menuIcon.classList.toggle('non-active');
			menuIcon.classList.toggle('active');
			closeIcon.classList.toggle('non-active');
			closeIcon.classList.toggle('active');
		}		
	}

	return (
		<>
			<div className={styles.navContainer}>
				<div className={styles.nav}>
					<div  className={`${styles.menuContainer}`} onClick={toggleMenu}>
						<IoMenuSharp id='menu-icon' className={`${styles.menuIcon} active`} />
						<IoCloseCircleOutline id='close-icon' className={`${styles.closeIcon} non-active`}/>
					</div>
					<div className={styles.menuBackdrop}></div>					
					<GoHomeFill className={`${styles.navIcon} ${styles.iconLeft} ms-2 mt-5`} />
					<div className={`${styles.circle} ${styles.circleLeft}`}></div>
					<div className={styles.bar}></div>
					<div className={`${styles.circle} ${styles.circleRight}`}></div>
					<IoMdPerson className={`${styles.navIcon} ${styles.iconRight} me-2 mt-5`} />
				</div>				
			</div>
		</>
	);
};

export default Hotbar;
