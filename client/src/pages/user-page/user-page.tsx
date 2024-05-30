import Page from '../../components/Page/Page';
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
				return navigate('/profile', { replace: true });
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

					<Profile {...userData} />

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
