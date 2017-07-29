import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import App from './components/App';
import Design from './components/Design';
import Analysis from './components/Analysis';

const routes = (
	<Route path = '/' component = {App}>
		<Route path = '/design' component = {Design} />
		<Route path = '/analysis' component = {Analysis} />
	</Route>
);

export default routes;