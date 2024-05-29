/* Import for the main stylesheet */
import './index.css';

/* Imports from React */
import { useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { ToastContainer } from 'react-toastify';

/* Import from wouter */
import { Switch, Route, useLocation } from 'wouter';

/* Utility imports for client side authentication */
import { Auth, UserAuthContext } from './lib/auth';

/* Import for client hostname */
import { getClientHost } from './environment';

/* Imports for all pages of the website */
import LandingPage from './pages/landing-page/landing-page';
import { PlanetMap } from './pages/planet-map/planet-map';
import Home from './pages/home/home';
import Login from './pages/login/login-component';
import Signup from './pages/signup/signup-component';
import About from './pages/about/about-page';
import Forgetpassword from './pages/forgetpassword/forgetpassword';
import GeneralFeed from './pages/general-feed/general-feed';
import UserSettings from './pages/user-settings/user-settings-page';
import Resetpassword from './pages/resetpassword/resetpassword';
import ManageAccount from './pages/user-settings/options/manage-account-page';
import Messages from './pages/messages/messages-component';
import Policy from './pages/about/options/policy-page';
import Terms from './pages/about/options/terms-page';
import FAQs from './pages/faqs/faqs-page';
import LikedPage from './pages/user-settings/options/liked';
import SavedPage from './pages/user-settings/options/saved';
import CommentedPostPage from './pages/user-settings/options/commented';
import FollowingPage from './pages/following/following';
import FollowerPage from './pages/follower/follower';
import PostPage from './pages/post-page/post-page';
import UserPage from './pages/user-page/user-page';
import ProfilePage from './pages/profile-page/profile-page';
import PostDetailPage from './pages/post/post';
import Planets from './pages/planets/planets-component';
import PlanetFeed from './pages/planet-feed/planet-feed';
import MessagesAll from './pages/messages-all/messages';
import SearchPage from './pages/search-page/search-page';
import Page404 from './pages/page404/page404';

/* Imports for custom componets made */
import SEO from './components/seo/seo';
import { Loader } from './components/loader/loader';
import Cursors from './components/cursor/cursor';
import SupportPage from './pages/support-page/support-page';

/**
 * Contructs, manages, and returns the entire client side.
 *
 * @returns the client side application as a JSX.Element.
 */
export const App = () => {
	const [loading, setLoading] = useState(true);
	const [authenticatedUser, setAuthenticatedUser] = useState<any>();
	const [loc] = useLocation();

	useEffect(() => void Auth.resaveToken(), []);

	useEffect(() => {
		setLoading(true);
		Auth.getAuthenticatedUser().then((user) => {
			setAuthenticatedUser(user);
			setLoading(false);
		});
	}, [loc]);

	/**
	 * The common routes throughout this website.
	 */
	const commonRoutes = (
		<>
			<Route path='/signup' component={Signup} />
			<Route path='/login' component={Login} />
			<Route path='/about' component={About} />
			<Route path='/about/policy' component={Policy} />
			<Route path='/about/terms' component={Terms} />
			<Route path='/faqs' component={FAQs} />
			<Route path='/support' component={SupportPage} />
			<Route path='/forgetpassword' component={Forgetpassword} />
			<Route path='/resetpassword/:token'>{(params) => <Resetpassword token={params.token} />}</Route>
			<Route path='/planets' component={Planets} />
			<Route path='/post/:id'>{(params) => <PostDetailPage id={params.id} />}</Route>
		</>
	);

	return (
		<>
			<SEO
				title='Skynet'
				description='The interplanetary communication platform of the future.'
				og={{ image: getClientHost() + '/logo.webp', type: 'website', imageAlt: 'Skynet Logo' }}
			/>

			<ToastContainer />
			<Cursors />

			<If condition={loading}>
				<Then>
					<Loader />
				</Then>

				<Else>
					<If condition={!authenticatedUser}>
						<Then>
							<Switch>
								{commonRoutes}
								<Route component={LandingPage} />
							</Switch>
						</Then>

						<Else>
							<UserAuthContext.Provider value={authenticatedUser}>
								<Switch>
									<Route path='/'>{() => <PlanetMap interactable />}</Route>
									<Route path='/home'>{() => <PlanetMap interactable />}</Route>
									<Route path='/home-list' component={Home} />
									<Route path='/feed' component={GeneralFeed} />
									<Route path='/post' component={PostPage} />
									<Route path='/search' component={SearchPage} />
									<Route path='/user/:id' component={UserPage} />
									<Route path='/feed/:planetName/:id' component={PlanetFeed} />
									<Route path='/profile' component={ProfilePage} />
									<Route path='/settings' component={UserSettings} />
									<Route path='/settings/manageAccount' component={ManageAccount} />
									<Route path='/messages/:id' component={Messages} />
									<Route path='/liked' component={LikedPage} />
									<Route path='/saved' component={SavedPage} />
									<Route path='/commented' component={CommentedPostPage} />
									<Route path='/following' component={FollowingPage} />
									<Route path='/followers' component={FollowerPage} />
									<Route path='/messages' component={MessagesAll} />

									{commonRoutes}

									<Route component={Page404}>404 Not Found</Route>
								</Switch>
							</UserAuthContext.Provider>
						</Else>
					</If>
				</Else>
			</If>
		</>
	);
};
