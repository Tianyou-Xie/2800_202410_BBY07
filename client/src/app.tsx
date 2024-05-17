import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'wouter';
import About from './pages/about/about';
import Changepassword from './pages/changepassword/changepassword';
import Forgetpassword from './pages/forgetpassword/forgetpassword';
import GeneralFeed from './pages/general-feed/general-feed';
import Home from './pages/home/home';
import Login from './pages/login/login';
import MyFeed from './pages/my-feed/my-feed';
import Signup from './pages/signup/signup';
import Test from './pages/test-page/test-page';
import { useEffect } from 'react';
import { Auth } from './lib/auth';

import './index.css';

export const App = () => {
	useEffect(() => {
		Auth.resaveToken();
	}, []);

	return (
		<>
			<ToastContainer />
			<Switch>
				<Route path='/' component={Signup} />
				<Route path='/about' component={About} />
				<Route path='/signup' component={Signup} />
				<Route path='/forgetpassword' component={Forgetpassword} />
				<Route path='/changepassword' component={Changepassword} />
				<Route path='/login' component={Login} />
				<Route path='/feed' component={GeneralFeed} />
				<Route path='/myfeed' component={MyFeed} />
				<Route path='/home' component={Home} />

				{/* Page to test components */}
				<Route path='/test' component={Test} />

				<Route>404 Not Found</Route>
			</Switch>
		</>
	);
};
