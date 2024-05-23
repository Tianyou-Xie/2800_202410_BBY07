import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect, useLocation } from 'wouter';
import About from './pages/about/about';
import Changepassword from './pages/changepassword/changepassword';
import Forgetpassword from './pages/forgetpassword/forgetpassword';
import GeneralFeed from './pages/general-feed/general-feed';
import Home from './pages/home/home';
import Login from './pages/login/login-component';
import MyFeed from './pages/my-feed/my-feed';
import Signup from './pages/signup/signup-component';
import Test from './pages/test-page/test-page';
import UserSettings from './pages/user-settings/user-settings';
import Resetpassword from './pages/resetpassword/resetpassword';
import Planets from './pages/planets/planets-component';
import { useEffect, useState } from 'react';
import { Auth } from './lib/auth';
import Cursors from './components/cursor/cursor';

import './index.css';
import { Else, If, Then } from 'react-if';
import { Loader } from './components/loader/loader';
import { PlanetMap } from './pages/planet-map/planet-map';

export const App = () => {
	const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);
	const [loc] = useLocation();

	useEffect(() => {
		Auth.resaveToken();
	}, []);

	useEffect(() => {
		Auth.isAuthorized().then((v) => {
			setAuthorized(v === true);
		});
	}, [loc]);

	const commonRoutes = (
		<>
			<Route path='/signup' component={Signup} />
			<Route path='/login' component={Login} />
			<Route path='/about' component={About} />
			<Route path='/forgetpassword' component={Forgetpassword} />
			<Route path='/resetpassword/:token'>{(params) => <Resetpassword token={params.token} />}</Route>
			<Route path='/test' component={Test} />
			<Route path='/planets' component={Planets} />
			<Route>404 Not Found</Route>
		</>
	);

	return (
		<>
			<ToastContainer />
			<Cursors />

			<If condition={authorized === true}>
				<Then>
					<Switch>
						<Route path='/' component={Home} />
						<Route path='/home' component={PlanetMap} />
						<Route path='/changepassword' component={Changepassword} />
						<Route path='/feed' component={GeneralFeed} />
						<Route path='/myfeed' component={MyFeed} />
						<Route path='/settings' component={UserSettings} />
						{commonRoutes}
					</Switch>
				</Then>

				<Else>
					<If condition={authorized === false}>
						<Then>
							<Switch>
								<Route path='/' component={Login} />
								{commonRoutes}

								<Route children={<Redirect href='/' />} />
							</Switch>
						</Then>

						<Else>
							<Loader />
						</Else>
					</If>
				</Else>
			</If>
		</>
	);
};
