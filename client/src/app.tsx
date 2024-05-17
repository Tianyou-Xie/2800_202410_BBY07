import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect, useLocation } from 'wouter';
import About from './pages/about/about';
import Changepassword from './pages/changepassword/changepassword';
import Forgetpassword from './pages/forgetpassword/forgetpassword';
import GeneralFeed from './pages/general-feed/general-feed';
import Home from './pages/home/home';
import Login from './pages/login/login-component';
import MyFeed from './pages/my-feed/my-feed';
import Signup from './pages/signup/signup';
import Test from './pages/test-page/test-page';
import { useEffect, useState } from 'react';
import { Auth } from './lib/auth';

import './index.css';

export const App = () => {
	const [authorized, setAuthorized] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		Auth.resaveToken();
		Auth.isAuthorized().then((v) => setAuthorized(v));
	}, []);

	return (
		<>
			<ToastContainer />
			<Switch>
				{authorized === undefined ? (
					<></>
				) : (
					<>
						<Route path='/about' component={About} />
						<Route path='/signup' component={Signup} />
						<Route path='/forgetpassword' component={Forgetpassword} />
						<Route path='/changepassword' component={Changepassword} />
						<Route path='/login' component={Login} />
						<Route path='/feed' component={GeneralFeed} />
						<Route path='/myfeed' component={MyFeed} />
						<Route path='/home' component={Home} />

						{authorized === false ? <Redirect href='/login' /> : <Route path='/' component={Home} />}
					</>
				)}

				{/* Page to test components */}
				<Route path='/test' component={Test} />

				<Route>404 Not Found</Route>
			</Switch>
		</>
	);
};
