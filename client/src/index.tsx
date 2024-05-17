// import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';

import { Route, Switch } from 'wouter';
import GoodbyePage from './pages/goodbye/goodbye';
import About from './pages/about/about';
import Signup from './pages/signup/signup';
import Hotbar from './components/Hotbar/Hotbar';
import Forgetpassword from './pages/forgetpassword/forgetpassword';
import Changepassword from './pages/changepassword/changepassword';
import Login from './pages/login/login';

import Test from './pages/test-page/test-page';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<Switch>
		<Route path='/' component={Signup} />
		<Route path='/goodbye' component={GoodbyePage} />
		<Route path='/about' component={About} />
		<Route path='/signup' component={Signup} />
		<Route path='/forgetpassword' component={Forgetpassword} />
		<Route path='/changepassword' component={Changepassword} />
		<Route path='/login' component={Login} />

		{/* Page to test components */}
		<Route path='/test' component={Test} />

		<Route>404 Not Found</Route>
	</Switch>,
	// <Hotbar />
	// </React.StrictMode>,
);
