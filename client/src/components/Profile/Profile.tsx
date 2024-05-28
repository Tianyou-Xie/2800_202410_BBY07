import styles from './Profile.module.css';

import UIBox from '../UIBox/UIBox';
import { Link } from 'wouter';

interface ProfileProp {
	userId: string;
	username: string;
	description?: string;
	follower: number;
	following: number;
	postCount: number;
	outsideUser?: boolean;
	className?: string;
    avatar?: string;
}

/**
 * Post component representing the thumbnail post of an user.
 *
 * @param props.username string - Username of the author of the post
 * @param props.text string - Text of the post
 * @param props.postURL string - URL of the complete version of the post with comments and more information
 * @param props.createdAt Date - (optional) Date in which the post was created
 */
const Profile = (props: ProfileProp): JSX.Element => {
    console.log(props)
	return (
		<>
			<div className={`container`}>
				<div className='row d-flex justify-content-center'>
					<div className='col-md-7'>
                    <div className='card text-center'><UIBox
								content={
									<>
										<div className={`col-md-7 ${styles.borderRight} no-gutters`}>
											<div className='py-3'>
												<img
													src={props.avatar}
													width='210'
													className='rounded-circle'
												/>

												<div className='stats'></div>
												<div className='mt-4'>
													<h4 className={styles.username}>@{props.username}</h4>
												</div>
											</div>
										</div>
										<div className='col-md-5'>
											<div className='py-3'>
												<div className='mt-4'>
													<span className='d-block head'>{props.follower} followers</span>
												</div>
												<div className='mt-4'>
													<span className='d-block head'>{props.following} following</span>
												</div>
												<div className='mt-4'>
													<span className='d-block head'>{props.postCount} posts</span>
												</div>
											</div>
										</div>
										{/* <h3 className={styles.username}>@{props.username}</h3> */}
										{/* {props.description ? <p>{props.description}</p> : <></>}
										<h6>{props.follower} followers</h6>
										<h6>{props.following} following</h6>
										<h6 className={styles.lastText}>{props.postCount} posts</h6> */}
									</>
								}
								className={styles.profileInfoBox}
								curved
							/></div>
							
							<div className={styles.bottomButtons}>
								<button>
									<Link href={props.outsideUser ? '/#FOLLOW/' + props.userId : '/#EDIT_PROFILE'}>
										<UIBox
											className={styles.edit + ' ' + styles.buttons}
											content={props.outsideUser ? 'Follow' : 'Edit profile'}
											curved
											clickable
											dark
										/>
									</Link>
								</button>
								<button>
									<Link href={props.outsideUser ? '/messages/' + props.userId : '/settings'}>
										<UIBox
											className={styles.settings + ' ' + styles.buttons}
											content={props.outsideUser ? 'Message' : '*'}
											curved
											clickable
											dark
										/>
									</Link>
								</button>
							</div>
					</div>
				</div>
			</div>
			<div className={styles.line}></div>
		</>
	);
};

export default Profile;
