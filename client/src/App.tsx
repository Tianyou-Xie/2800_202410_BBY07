import { Route, Switch } from 'wouter';
import IndexPage from './pages';
import UsersPage from './pages/users';

const App = () => {
	return (
		<>
			<Switch>
				<Route path='/' component={IndexPage} />
				<Route path='/users' component={UsersPage} />

				<Route>404 Not Found</Route>
			</Switch>
		</>
	);
};

export default App;
