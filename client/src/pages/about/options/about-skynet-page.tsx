/* Stylesheet imports */
import styles from '../about-page.module.css';

/* Imports from other components created */
import Page from '../../../components/kebab1/kebab';

/**
 * Constructs and returns the About Skynet page.
 * Contains information about the app and the project Sky.net and the team behind the app.
 *
 * @returns the About Skynet page as a JSX.Element.
 */
const AboutSkynetPage = () => {
	return (
		<>
			<Page
				pageName='About Skynet'
				content={
					<div className={styles.officalPagesBody}>
						<h1 className={styles.headingStyle}>Meet our app: Sky.Net</h1>
						<p>
							<strong>Sky.net</strong> is an interplanetary communication network used to connect and
							share events and ideologies from all humanity accross the galaxy and help making the
							distance between communities feel smaller.
						</p>
						<p>
							<strong>
								<big>No matter the distance. No matter the time. Always connected.</big>
							</strong>
						</p>
						<h4 className={styles.secondHeading}>Stay connected with the whole galaxy</h4>
						<p>
							Browse through planetary feeds and amazing communities of people. Be part of a planet or
							share and connect with people in other planets by posting, reposting and commenting posts.
							<br />
							<p>
								<strong>OR</strong> get connected in a galactical feed that shows the latest and most
								important trends and posts of the galaxy in one place.
							</p>
						</p>
						<h4 className={styles.secondHeading}>Share and connect with people who want to know you</h4>
						<p>
							Share your ideas through posts to the planetary feed you want.
							<br />
							Like, save and comment the posts you like the most. Follow and message all your friends and
							famiily to stay connected with them all the time.
						</p>
						<h4 className={styles.secondHeading}>Build your profile and be unique in a galaxy of people</h4>
						<p>
							Personalize your bio description and have a user profile page just for you.
							<br />
							Edit your profile picture or have a personalized AI generated avatar picture just for you.
						</p>
						<br />
						<h1 className={styles.headingStyle}>Meet the project</h1>
						<p>
							<strong>Sky.Net</strong> was created by team SkyOps - Skynetwork Operations (BBY-007) as a
							project for the PROJ2800 course in BCIT-Term 1. Our idea was to create a hometown in which,
							in the future, all humanity could reunite and share their ideas even lightyears away.
							<br />
							Our team put a huge amount of effort and we appreaciate you as our users for trying out and
							being part of this project.
							<br />
							<br />
							For more technical details, you can access our public repository on GitHub:
							<a href='https://github.com/Tianyou-Xie/2800_202410_BBY07'> Sky.net repository</a>
						</p>
						<br />
						<h1 className={styles.headingStyle}>Meet our team SkyOps (BBY-007)</h1>
						<p>
							We were all directors, producers, designers and developers in this project. Meet our team of
							web development professionals.
						</p>
						<h4 className={styles.secondHeading}>Kamal Dolikay</h4>
						<ul>
							<li>
								Github: <a href='https://github.com/kamalkdolikay'>@kamalkdolikay</a>
							</li>
							<li>Discord: @agent_kd</li>
							<li>Slack: @Kamal Dolikay</li>
							<li>
								Contact email: <a href='mailto:kamaldolikay@gmail.com'>kamaldolikay@gmail.com</a>
							</li>
						</ul>
						<h4 className={styles.secondHeading}>Ole Lammers</h4>
						<ul>
							<li>
								Github: <a href='https://www.github.com/Zyrakia'>@Zyrakia</a>
							</li>
							<li>Discord: @zyrakia</li>
							<li>Slack: @Ole Lammers</li>
							<li>
								Personal website: <a href='https://zyrakia.dev'>zyrakia.dev</a>
							</li>
							<li>
								Contact email: <a href='mailto:mail@zyrakia.dev'>mail@zyrakia.dev</a>
							</li>
						</ul>
						<h4 className={styles.secondHeading}>Tianyou Xie</h4>
						<ul>
							<li>
								Github: <a href='https://github.com/Tianyou-Xie'>@Tianyou-Xie</a>
							</li>
							<li>Discord: @tianyou_x</li>
							<li>Slack: @Tianyou Xie</li>
							<li>
								Contact email: <a href='mailto:tianyouxie001@gmail.com'>tianyouxie001@gmail.com</a>
							</li>
						</ul>
						<h4 className={styles.secondHeading}>Samarjit Bhogal</h4>
						<ul>
							<li>
								Github: <a href='https://github.com/SamarjitBhogal'>@SamarjitBhogal</a>
							</li>
							<li>Discord: @_samallama</li>
							<li>Slack: @Samarjit Bhogal</li>
							<li>
								Contact email:{' '}
								<a href='mailto:samarjit.v.bhogal@gmail.com'>samarjit.v.bhogal@gmail.com</a>
							</li>
						</ul>
						<h4 className={styles.secondHeading}>Marcus Lages</h4>
						<ul>
							<li>
								Github: <a href='https://www.github.com/MarcusLages'>@MarcusLages</a>
							</li>
							<li>Discord: @thelich13</li>
							<li>Slack: @Marcus V S Lages</li>
							<li>
								Contact email: <a href='mailto:marcusvlages@gmail.com'>marcusvlages@gmail.com</a>
							</li>
						</ul>
						<br />
						<strong className={styles.finalPhrase}>
							Stay in touch for the next steps of Sky.net in this galaxy of possibilities.
						</strong>
					</div>
				}
			/>
		</>
	);
};

/**
 * Exports the About Skynet page for external use.
 */
export default AboutSkynetPage;
