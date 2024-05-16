import { useState } from 'react';

import styles from './Hotbar.module.css';
import './hotbar-animation.css';

import { GoHomeFill } from 'react-icons/go';
import { IoMdPerson } from 'react-icons/io';
import { IoMenuSharp } from 'react-icons/io5';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoIosAddCircle } from 'react-icons/io';
import { MdFeed } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';
import { MdPeople } from 'react-icons/md';

const Hotbar = () => {
	const [isChecked, setCheck] = useState(false);

	function toggleMenu() {
		let menuIcon = document.getElementById('menu-icon');
		let closeIcon = document.getElementById('close-icon');
		if (menuIcon !== null && closeIcon !== null) {
			menuIcon.classList.toggle('non-active');
			menuIcon.classList.toggle('active');
			closeIcon.classList.toggle('non-active');
			closeIcon.classList.toggle('active');
		}
		setCheck(!isChecked);
	}

	return (
		<>
			<div className={styles.navContainer}>
				<div className={styles.nav}>
					<div>
						{/* <p className={`${styles.menuLabel}`}>menu - menu - menu</p> */}
						<div className={`${styles.menuContainer}`}>
							<label htmlFor='label'>
								<IoMenuSharp id='menu-icon' className={`${styles.menuIcon} active`} />
								<IoCloseCircleOutline id='close-icon' className={`${styles.closeIcon} non-active`} />
							</label>
						</div>
						<input type='checkbox' id='label' defaultChecked={isChecked} onClick={toggleMenu} hidden />
						<div className={styles.backDropDiv}></div>
							<ul className={styles.submenu}>
							<li>
								<a href='#FEED'>
									<MdFeed className={`${styles.menuSubIcons}`} />
									<p className='text-center'>FEED</p>
								</a>
							</li>
							<li>
								<a href='#POST'>
									<IoIosAddCircle className={`${styles.menuSubIcons}`} />
									<p className='text-center'>POST</p>
								</a>
							</li>
							<li>
								<a href='#MESSAGE'>
									<AiFillMessage className={`${styles.menuSubIcons}`} />
									<p className='text-center'>MESSAGE</p>
								</a>
							</li>
							<li>
								<a href='#FOLLOWERS'>
									<MdPeople className={`${styles.menuSubIcons}`} />
									<p className='text-center'>FOLLOWERS</p>
								</a>
							</li>
						</ul>
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
