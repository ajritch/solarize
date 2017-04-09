import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import App from './components/App';
import Design from './components/Design';

const routes = (
	<Route path = '/' component = {App}>
		<Route path = '/design' component = {Design} />
	</Route>
);

export default routes;