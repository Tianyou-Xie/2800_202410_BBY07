import styles from './post-page.module.css';
import Page from '../../components/Page/Page';
import UIBox from '../../components/UIBox/UIBox';
import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';

interface PostProps {}

const PostPage = function (props: PostProps) {
	interface Planet {
		_id: string;
		name: string;
	}

	const [planets, setPlanets] = useState<Array<Planet>>([]);

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

	return (
		<>
			<Page
				pageName='Post'
				content={
					<>
						<div className={styles.general}>
							<form onSubmit={submitPost}>
								<UIBox className={styles.username} content={<>@username</>} curved dark />
								<UIBox
									className={styles.post}
									content={
										<input
											name='post'
											className={styles.textBox}
											type='text'
											placeholder='Share your ideas...'
											// required
										/>
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
									<button className={styles.submit}>
										<UIBox content={<>Post</>} curved dark />
									</button>
								</div>
							</form>
						</div>
					</>
				}
			/>
		</>
	);
};

function submitPost() {}

export default PostPage;
