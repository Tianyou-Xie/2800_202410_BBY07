import { ToastContainer } from 'react-toastify';
import { Switch, Route, useLocation } from 'wouter';
import About from './pages/about/about';
import Changepassword from './pages/changepassword/changepassword';
import Forgetpassword from './pages/forgetpassword/forgetpassword';
import GeneralFeed from './pages/general-feed/general-feed';
import Login from './pages/login/login-component';
import Signup from './pages/signup/signup-component';
import Test from './pages/test-page/test-page';
import UserSettings from './pages/user-settings/user-settings';
import Resetpassword from './pages/resetpassword/resetpassword';
import ManageAccount from './pages/user-settings/options/manage-account';
import Messages from './pages/messages/messages-component';
import Policy from './pages/about/options/policy';
import Terms from './pages/about/options/terms';
import { useEffect, useState } from 'react';
import { Auth, UserAuthContext } from './lib/auth';
import Cursors from './components/cursor/cursor';

import { Else, If, Then } from 'react-if';
import { Loader } from './components/loader/loader';
import PostPage from './pages/post-page/post-page';
import UserPage from './pages/user-page/user-page';
import ProfilePage from './pages/profile-page/profile-page';
import { PlanetMap } from './pages/planet-map/planet-map';

import './index.css';
import Home from './pages/home/home';
import PostDetailPage from './pages/post/post';
import Planets from './pages/planets/planets-component';
import PlanetFeed from './pages/planet-feed/planet-feed';

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

	const commonRoutes = (
		<>
			<Route path='/signup' component={Signup} />
			<Route path='/login' component={Login} />
			<Route path='/about' component={About} />
			<Route path='/about/policy' component={Policy} />
			<Route path='/about/terms' component={Terms} />
			<Route path='/forgetpassword' component={Forgetpassword} />
			<Route path='/resetpassword/:token'>{(params) => <Resetpassword token={params.token} />}</Route>
			<Route path='/test' component={Test} />
			<Route path='/planets' component={Planets} />
			<Route path='/post/:id'>{(params) => <PostDetailPage id={params.id} />}</Route>
		</>
	);

	return (
		<>
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
								<Route component={Login} />
							</Switch>
						</Then>

						<Else>
							<UserAuthContext.Provider value={authenticatedUser}>
								<Switch>
									<Route path='/' component={PlanetMap} />
									<Route path='/home' component={PlanetMap} />
									<Route path='/home-list' component={Home} />
									<Route path='/changepassword' component={Changepassword} />
									<Route path='/feed' component={GeneralFeed} />
									<Route path='/post' component={PostPage} />
									<Route path='/user/:id' component={UserPage} />
									<Route path='/feed/:planetName/:id' component={PlanetFeed} />
									<Route path='/profile' component={ProfilePage} />
									<Route path='/settings' component={UserSettings} />
									<Route path='/settings/manageAccount' component={ManageAccount} />
									<Route path='/messages/:id' component={Messages} />

									{commonRoutes}

									<Route>404 Not Found</Route>
								</Switch>
							</UserAuthContext.Provider>
						</Else>
					</If>
				</Else>
			</If>
		</>
	);
};
