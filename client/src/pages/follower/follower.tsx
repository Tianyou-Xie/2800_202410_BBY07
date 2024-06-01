/* Stylesheet imports */
import styles from './follower.module.css';

/* Import from React */
import { Link } from 'wouter';

/* Import from React */
import { useEffect, useState } from 'react';

/* Imports for frontend api call and authentication verification */
import { api } from '../../lib/axios';

/* Import from other components created */
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
 * Constructs, manages, and returns the FollowerPage component.
 *
 * @return The FollowerPage component as a JSX.Element
 */
const FollowerPage = () => {
	const [followerUsers, setFollowerUsers] = useState<UserProp[]>([]);

	useEffect(() => {
		const fetchFollower = async () => {
			try {
				const response = await api.get<PostResponse>(`/user/follower`);
				if (response.data.success) setFollowerUsers(response.data.value);
			} catch {}
		};

		fetchFollower();
	}, []);

	return (
		<Page
			pageName='Follower'
			content={
				<div className={`${styles.userList} container`}>
					{followerUsers.map((user) => (
						<Link key={user._id} href={`/user/${user._id}`} className={styles.userLink}>
							<div className={styles.userItem}>
								<img src={user.avatarUrl} alt={user.userName} className={styles.avatar} />
								<div
									className={`${styles.userInfo} d-flex flex-column p-1 flex-sm-row gap-sm-3 align-items-sm-center`}>
									<p className={styles.userName}>{user.userName}</p>
									<p>Followers: {user.followerCount}</p>
									<p>Following: {user.followingCount}</p>
									<p>Posts: {user.postCount}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			}
		/>
	);
};

export default FollowerPage;
