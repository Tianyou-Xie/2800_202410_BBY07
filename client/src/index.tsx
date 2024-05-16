import React from 'react';
import ReactDOM from 'react-dom/client';

import { Route, Switch } from 'wouter';
import IndexPage from './pages';
import GoodbyePage from './pages/goodbye/goodbye';
import About from './pages/about/about';
import Signup from './pages/signup/signup';
import Hotbar from './components/Hotbar/Hotbar';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css';

import Test from './pages/test-page/test-page';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Switch>
			<Route path='/' component={IndexPage} />
			<Route path='/goodbye' component={GoodbyePage} />
			<Route path='/about' component={About} />
			<Route path='/signup' component={Signup} />

			{/* Page to test components */}
			<Route path='/test' component={Test} />

			<Route>404 Not Found</Route>
		</Switch>
		<Hotbar />
	</React.StrictMode>,
);
