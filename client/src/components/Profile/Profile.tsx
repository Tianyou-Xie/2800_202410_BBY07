import { useState } from 'react';

import styles from './Profile.module.css';

import { Container } from 'react-bootstrap';
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
	return (
		<>
			<div className={styles.profileBox}>
				<UIBox
					content={
						<>
							<h3 className={styles.username}>@{props.username}</h3>
							{props.description ? <p>{props.description}</p> : <></>}
							<h6>{props.follower} followers</h6>
							<h6>{props.following} following</h6>
							<h6 className={styles.lastText}>{props.postCount} posts</h6>
						</>
					}
					className={styles.profileInfoBox}
					curved
				/>
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
						<Link href={props.outsideUser ? '/#MESSAGE/' + props.userId : '/settings'}>
							<UIBox
								className={styles.settings + ' ' + styles.buttons}
								content={props.outsideUser ? 'Message' + props.userId : '*'}
								curved
								clickable
								dark
							/>
						</Link>
					</button>
				</div>
			</div>
			<div className={styles.line}></div>
		</>
	);
};

export default Profile;
