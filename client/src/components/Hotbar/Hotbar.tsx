import styles from './Hotbar.module.css';
import './hotbar.css';

import { GoHomeFill } from "react-icons/go";
import { IoMdPerson } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";

const Hotbar = () => {

	function toggleMenu() {
		console.log('here1');
		let menuIcon = document.getElementById("menu-icon");
		let closeIcon = document.getElementById("close-icon");

		if (menuIcon !== null && closeIcon !== null) {
			menuIcon.classList.toggle('non-active');
			menuIcon.classList.toggle('active');
			closeIcon.classList.toggle('non-active');
			closeIcon.classList.toggle('active');
			if (closeIcon.classList.contains('active')) {
				closeIcon.style.zIndex= '5';
				menuIcon.style.zIndex= '4';
			} else {
				closeIcon.style.zIndex= '4';
				menuIcon.style.zIndex= '5';
			}
		}		
	}

	function toggleClose() {
		console.log('here2');
		let menuIcon = document.getElementById("menu-icon");
		let closeIcon = document.getElementById("close-icon");

		if (menuIcon !== null && closeIcon !== null) {
			menuIcon.classList.toggle('non-active');
			menuIcon.classList.toggle('active');
			closeIcon.classList.toggle('non-active');
			closeIcon.classList.toggle('active');
			if (closeIcon.classList.contains('active')) {
				closeIcon.style.zIndex= '5';
			} else {
				closeIcon.style.zIndex= '4';
			}
		}		
	}

	return (
		<>
			<div className={styles.navContainer}>
				<div className={styles.nav}>
					<div id='menu-icon' className={`${styles.menuContainerMenu}`} onClick={toggleMenu}>
						<IoMenuSharp className={`${styles.menuIcon} active`} />
					</div>
					<div id='close-icon' className={`${styles.menuContainerClose} `} onClick={toggleClose}>
						<IoCloseCircleOutline className={`${styles.closeIcon} non-active`}/>
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
