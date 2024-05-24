import styles from './post-page.module.css';
import Page from '../../components/Page/Page';
import UIBox from '../../components/UIBox/UIBox';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { toast } from 'react-toastify';
import { useLocation } from 'wouter';
import { UserAuthContext } from '../../lib/auth';

interface PostProps {}

const PostPage = function (props: PostProps) {
	const user = useContext(UserAuthContext);

	interface Planet {
		_id: string;
		name: string;
	}

	const [planets, setPlanets] = useState<Array<Planet>>([]);
	const [_, setLocation] = useLocation();

	useEffect(() => {
		(async function fetchPlanets() {
			try {
				const { data: res } = await api.get('/planet');
				const data = res.value;
				setPlanets(data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	async function submitPost() {
		const geoLoc = await new Promise<GeolocationPosition | undefined>((res) => {
			navigator.geolocation.getCurrentPosition(
				(p) => res(p),
				() => res(undefined),
			);
		});

		const postContent = document.getElementsByTagName('textarea');
		const content = postContent[0].value;
		const planet = document.getElementsByTagName('select');
		const planetID = planet[0].value;

		const postRequest = {
			content: content,
			location: {
				latitude: geoLoc ? geoLoc.coords.latitude : 0,
				longitude: geoLoc ? geoLoc.coords.longitude : 0,
				planetId: planetID,
			},
		};

		console.log(postRequest);

		try {
			const res = await api.post('/post', postRequest);
			setLocation('/myfeed');
			toast.success(res.data.message);
		} catch (err: any) {
			toast.error(`${err.response.data.error}`, {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		}
	}

	return (
		<>
			<Page
				pageName='Post'
				content={
					<>
						<div className={styles.general}>
							<UIBox
								className={styles.username}
								content={user ? `@${user.userName}` : 'Unknown'}
								curved
								dark
							/>
							<UIBox
								className={styles.post}
								content={
									<textarea
										id='post'
										name='post'
										className={styles.textBox}
										maxLength={324}
										placeholder='Share your ideas...'></textarea>
								}
								curved
							/>
							<div className={styles.sideButtons}>
								<select
									name='planets'
									id='planets'
									defaultValue={planets[0]?._id}
									className={styles.select}
									required>
									{planets.map((planet: any, index: number) => {
										return (
											<option key={index} value={planet._id}>
												{planet.name}
											</option>
										);
									})}
								</select>
								<button className={styles.submit} onClick={submitPost}>
									<UIBox content='Post' curved dark clickable />
								</button>
							</div>
						</div>
					</>
				}
			/>
		</>
	);
};

export default PostPage;
