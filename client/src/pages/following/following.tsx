/* Stylesheet imports */
import styles from './following.module.css';

/* Import from React */
import { useEffect, useState } from 'react';

/* Import from wouter */
import { Link } from 'wouter';

/* Imports for frontend api call and authentication verification */
import { api } from '../../lib/axios';

/* Imports from other components created */
import Page from '../../components/page/page';

/* Define the PostResponse interface */
interface PostResponse {
	statusCode: number;
	statusMessage: string;
	value: UserProp[];
	success: boolean;
}

/* Define the UserProp interface */
interface UserProp {
	_id: string;
	userName: string;
	followerCount: number;
	followingCount: number;
	postCount: number;
	avatarUrl?: string;
}

/**
 * Constructs, manages, and returns the FollowingPage component.
 *
 * @return The FollowingPage component as a JSX.Element
 */
const FollowingPage = () => {
	const [followingUsers, setFollowingUsers] = useState<UserProp[]>([]);

	useEffect(() => {
		const fetchFollowing = async () => {
			try {
				const response = await api.get<PostResponse>(`/user/following`);
				if (response.data.success) setFollowingUsers(response.data.value);
			} catch {}
		};

		fetchFollowing();
	}, []);

	return (
		<Page
			pageName='Following'
			content={
				<div className={`${styles.userList} container`}>
					{followingUsers.map((user) => (
						<Link key={user._id} href={`/user/${user._id}`} className={styles.userLink}>
							<div className={styles.userItem}>
								<img src={user.avatarUrl} alt={user.userName} className={styles.avatar} />
								<div
									className={`${styles.userInfo} d-flex flex-column p-1 flex-sm-row gap-sm-3 align-items-sm-center`}>
									<span className={styles.userName}>{user.userName}</span>
									<span>Followers: {user.followerCount}</span>
									<span>Following: {user.followingCount}</span>
									<span>Posts: {user.postCount}</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			}
		/>
	);
};

export default FollowingPage;
