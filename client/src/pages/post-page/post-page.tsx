/* Stylesheet imports */
import styles from './post-page.module.css';



/* Import from React */
import { useContext, useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

/* Import from wouter */
import { useLocation } from 'wouter';

/* Imports for frontend api call and authentication verification */
import { api } from '../../lib/axios';
import { AxiosError } from 'axios';
import { UserAuthContext } from '../../lib/auth';

/* Import from other components created */
import { SmallLoader } from '../../components/loader/small-loader';
import Page from '../../components/Page/Page';
import UIBox from '../../components/UIBox/UIBox';

/* Define the PostProps interface */
interface PostProps { }

/**
 * Constructs, manages, and returns the PostPage component.
 *
 * @param {PostProps} props - The properties object.
 * @return {JSX.Element} The PostPage component.
 */
const PostPage = function (props: PostProps) {
	const user = useContext(UserAuthContext);

	interface Planet {
		_id: string;
		name: string;
	}

	const [planets, setPlanets] = useState<Array<Planet>>([]);
	const [_, navigate] = useLocation();

	const [selectedPlanet, setSelectedPlanet] = useState(user?.location.planetId);
	const [postContent, setPostContent] = useState('');

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

	const [loading, setLoading] = useState(false);

	async function submitPost() {
		if (loading) return;
		setLoading(true);

		const geoLoc = await new Promise<GeolocationPosition | undefined>((res) => {
			navigator.geolocation.getCurrentPosition(
				(p) => res(p),
				() => res(undefined),
			);
		});

		const postRequest = {
			content: postContent,
			location: {
				latitude: geoLoc ? geoLoc.coords.latitude : 0,
				longitude: geoLoc ? geoLoc.coords.longitude : 0,
				planetId: selectedPlanet,
			},
		};

		try {
			const res = await api.post('/post', postRequest);
			const postId = res.data.value._id;
			if (!postId) throw 'Post was not able to be created.';
			toast.success('Post was created!');
			navigate(`/post/${postId}`);
		} catch (err: any) {
			toast.error(err instanceof AxiosError ? `${err.response?.data.error}` : err, {
				position: 'top-right',
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Page
				pageName='Post'
				content={
					<>
						<form
							className={`${styles.general} container`}
							onSubmit={(e) => {
								e.preventDefault();
								submitPost();
							}}>
							<UIBox
								className={styles.username}
								content={user ? `Posting as @${user.userName}` : 'Error retrieving username'}
								curved
								dark
							/>
							<UIBox
								className={`${styles.post} mb-2`}
								content={
									<textarea
										id='post'
										name='post'
										className={styles.textBox}
										minLength={1}
										maxLength={324}
										value={postContent}
										onChange={(e) => setPostContent(e.target.value)}
										placeholder='Share your ideas...'
										required
									/>
								}
								curved
							/>
							<div
								className={`${styles.sideButtons} w-100 d-flex justify-content-center justify-content-md-end`}>
								<select
									value={selectedPlanet}
									name='planets'
									id='planets'
									className={`${styles.select} px-2 py-1`}
									onChange={(v) => setSelectedPlanet(v.target.value.trim())}
									required>
									{planets.map((planet: any, index: number) => {
										return (
											<option key={index} value={planet._id}>
												{planet._id === user.location.planetId ? '🏠' : ``} {planet.name}
											</option>
										);
									})}
								</select>

								<UIBox
									className={`${styles.submitDiv} px-3 py-1`}
									content={
										<button
											disabled={loading}
											className={`${styles.submit} d-flex align-items-center justify-content-center gap-2`}>
											<If condition={loading}>
												<Then>
													<SmallLoader style={{ color: 'white' }} />
												</Then>
												<Else>
													<FaEdit /> Create Post
												</Else>
											</If>
										</button>
									}
									curved
									dark
									clickable
								/>
							</div>
						</form>
					</>
				}
			/>
		</>
	);
};

export default PostPage;
