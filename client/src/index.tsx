import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';

import { Route, Switch } from 'wouter';
import GoodbyePage from './pages/goodbye/goodbye';
import About from './pages/about/about';
import Signup from './pages/signup/signup';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Switch>
			<Route path='/' component={Signup} />
			<Route path='/goodbye' component={GoodbyePage} />
			<Route path='/about' component={About} />
			<Route path='/signup' component={Signup} />
			<Route>404 Not Found</Route>
		</Switch>
	</React.StrictMode>,
);
