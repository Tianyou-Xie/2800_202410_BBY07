import styles from './user-page.module.css';
import Page from '../../components/Page/Page';
import Post from '../../components/Post/Post';
import Profile from '../../components/Profile/Profile';
import { useLocation, useParams } from 'wouter';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { isUser } from '../../lib/isUser';
import { PaginatedPostFeed } from '../../components/paginated-post-feed/paginated-post-feed';
import SEO from '../../components/seo/seo';

const UserPage = () => {
	const [userData, setUserData] = useState<any>({});
	const [_, navigate] = useLocation();
	let { id = '' } = useParams();

	useEffect(() => {
		const getUserData = async function () {
			if (id !== undefined && (await isUser(id))) {
				navigate('/profile');
				return;
			} else {
				try {
					if (id == '') return;
					const res = await api.get('/user/' + id);
					setUserData(res.data.value);
				} catch (err) {
					console.log(err);
				}
			}
		};

		getUserData();
	}, []);

	return (
		<Page
			pageName={userData.userName}
			content={
				<>
					<SEO
						title={`${userData.userName} on Skynet`}
						description={`${userData.userName} is on Skynet, join them now!`}
						og={{ image: userData.avatarUrl, imageAlt: `${userData.userName} Avatar`, type: 'website' }}
					/>

					<Profile
						userId={userData._id}
						username={userData.userName}
						description={userData.bio}
						follower={userData.followerCount}
						following={userData.followingCount}
						postCount={userData.postCount}
						avatar={userData.avatarUrl}
						planetId={userData.location?.planetId}
						createdAt={userData.createdAt}
						outsideUser
					/>

					<PaginatedPostFeed
						feedKey={id}
						fetchPage={(page) => api.get(`/feed/${id}?page=${page}`).then((res) => res.data.value)}
					/>
				</>
			}
		/>
	);
};

export default UserPage;
