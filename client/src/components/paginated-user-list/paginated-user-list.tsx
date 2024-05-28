import styles from './paginated-user-list.module.css';
import { useEffect, useRef, useState } from 'react';
import { SmallLoader } from '../loader/small-loader';
import { Else, If, Then } from 'react-if';
import UIBox from '../UIBox/UIBox';
import { Link } from 'wouter';
import { Container } from 'react-bootstrap';

interface Props {
	/**
	 * A key that aligns to the uniqueness of this feed,
	 * to handle scroll restoration.
	 */
	feedKey: string;

	/**
	 * The function used to fetch new users.
	 * If this returns an empty array, it means that the end has been reached.
	 */
	fetchPage: (page: number) => Promise<any[]>;
}

/**
 * A feed of users that automatically fetches the next page while a
 * user is scrolling.
 */
export const PaginatedUserList = (props: Props) => {
	const [page, setPage] = useState(0);
	const [endReached, setEndReached] = useState(false);

	const usersListRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<any[]>([]);

	const fetchIncrement = async (increment: number) => {
		if (loading || endReached) return;

		const nextPage = (page ?? 0) + increment;
		if (nextPage < 1) return;

		try {
			const newUsers = await props.fetchPage(nextPage);
			if (newUsers.length === 0) return setEndReached(true);

			setPage(nextPage);
			setUsers(increment < 0 ? [...newUsers, ...users] : [...users, ...newUsers]);
		} catch (err) {
			return setEndReached(true);
		}
	};

	const checkScroll = () => {
		if (loading || endReached) return;

		const usersList = usersListRef.current;
		if (!usersList) return;

		const scrollBottom = window.scrollY + window.innerHeight;

		let increment;
		if (scrollBottom > usersList.scrollHeight - window.innerHeight) increment = 1;

		if (!increment) return;

		setLoading(true);
		fetchIncrement(increment).then(() => setLoading(false));
	};

	useEffect(checkScroll, []);
	useEffect(() => {
		const interval = setInterval(checkScroll, 1000);
		return () => clearInterval(interval);
	});

	return (
		<div className='w-100 my-3 d-flex justify-content-center'>
			<div ref={usersListRef} className='w-100 py-2 d-flex flex-column align-items-center gap-3'>
				{users
					.filter((v) => !!v)
					.map((v, i) => {
						return (
							<UIBox
								className={styles.userBox}
								key={i}
								content={
									<Link href={`/user/${v._id}`} className={styles.link}>
										<div className={styles.username}>{'@' + v.userName}</div>
										<div className={styles.followers}>{v.followerCount + ' followers'}</div>
									</Link>
								}
								dark
								curved
								clickable
							/>
						);
					})}

				<If condition={endReached}>
					<Then>
						<p>There is nothing else to see, so do not look.</p>
					</Then>
					<Else>
						<SmallLoader />
					</Else>
				</If>
			</div>
		</div>
	);
};
