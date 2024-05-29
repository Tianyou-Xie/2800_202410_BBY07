/* Stylesheet imports */
import styles from './Hotbar.module.css';
import './hotbar-animation.css';

/* Imports from react */
import { useState } from 'react';

/* Icon imports from react-icons */
import { GoHomeFill } from 'react-icons/go';
import { IoMdPerson } from 'react-icons/io';
import { IoMenuSharp } from 'react-icons/io5';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoIosAddCircle } from 'react-icons/io';
import { MdSearch } from 'react-icons/md';
import { AiFillMessage } from 'react-icons/ai';
import { MdPeople } from 'react-icons/md';

/**
 * Contructs the hotbar for the website.
 *
 * @returns The Hotbar for this website as a JSX.Element
 */
const Hotbar = () => {
	const [isChecked, setCheck] = useState(false);

	/**
	 * Responsible for toggling between the hamburger menu icon and the close icon.
	 */
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
								<a className='d-flex justify-content-center align-items-center' href='/following'>
									<div>
										<MdPeople className={`${styles.menuSubIcons}`} />
										<p className='text-center'>FOLLOWING</p>
									</div>
								</a>
							</li>
							<li>
								<a className='d-flex justify-content-center align-items-center' href='/search'>
									<div>
										<MdSearch className={`${styles.menuSubIcons}`} />
										<p className='text-center'>SEARCH</p>
									</div>
								</a>
							</li>
							<li>
								<a className='d-flex justify-content-center align-items-center' href='/post'>
									<div>
										<IoIosAddCircle className={`${styles.menuSubIcons}`} />
										<p className='text-center'>POST</p>
									</div>
								</a>
							</li>
							<li>
								<a className='d-flex justify-content-center align-items-center' href='/messages'>
									<div>
										<AiFillMessage className={`${styles.menuSubIcons}`} />
										<p className='text-center'>MESSAGES</p>
									</div>
								</a>
							</li>
						</ul>
					</div>

					<div className={styles.menuBackdrop}></div>
					<a href='/home'>
						<GoHomeFill className={`${styles.navIcon} ${styles.iconLeft} ms-2 mt-5`} />
					</a>
					<div className={`${styles.circle} ${styles.circleLeft}`}></div>
					<div className={styles.bar}></div>
					<div className={`${styles.circle} ${styles.circleRight}`}></div>
					<a href='/profile'>
						<IoMdPerson className={`${styles.navIcon} ${styles.iconRight} me-2 mt-5`} />
					</a>
				</div>
			</div>
		</>
	);
};

/**
 * Exports the hotbar for external use.
 */
export default Hotbar;
