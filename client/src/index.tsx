import ReactDOM from 'react-dom/client';
import { Route, Switch } from 'wouter';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import About from './pages/about/about';
import Signup from './pages/signup/signup';
import Forgetpassword from './pages/forgetpassword/forgetpassword';
import Changepassword from './pages/changepassword/changepassword';
import UserSettings from './pages/user-settings/user-settings';
import Login from './pages/login/login';
import GeneralFeed from './pages/general-feed/general-feed';
import MyFeed from './pages/my-feed/my-feed';
import Home from './pages/home/home';

import Test from './pages/test-page/test-page';
import { Auth } from './lib/auth';

Auth.resaveToken();
ReactDOM.createRoot(document.getElementById('root')!).render(
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
	</>,
);
