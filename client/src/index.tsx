import React from 'react';
import ReactDOM from 'react-dom/client';

import { Route, Switch } from 'wouter';
import IndexPage from './pages';
import GoodbyePage from './pages/goodbye';
import About from './pages/about';
import Header from './components/Header/Header';

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Header />
		<Switch>
			<Route path='/' component={IndexPage} />
			<Route path='/goodbye' component={GoodbyePage} />
			<Route path='/about' component={About} />
			<Route>404 Not Found</Route>
		</Switch>
	</React.StrictMode>,
);
