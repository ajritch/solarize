# ReactReduxStarter

This is a simple starter package, pre-loaded with React and Redux dependencies. Use this as a template to build out your applications. As of 3/2017, this is up-to-date with the most recent stable releases.

### Getting Started

Clone this repository, install the dependencies, and start the development server:

```
	> git clone https://github.com/ajritch/ReactReduxStarter.git
	> cd ReactReduxStarter
	> npm install
	> npm run dev_start
```
Navigate to http://localhost:8080 in your browser to view the application.


### Routing

To enable multiple routes in your application, simply add route components to your routes.js file. For example, to add a route to an "About" component, and add `{this.props.children}` to the JSX in your App.js file.

```
<Route path = '/' component = {App}>
	{/* put nested routes here */}
	<Route path = '/about' component = {About} />
</Route>
```


### Deployment

This project can be deployed as-is on Heroku; just make sure that the following two lines are included in the "scripts" object of your package.json file:

```
"start": "node server.js",
"postinstall": "webpack -p",
```

Note that the script `"dev_start": "node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js"` is only used to start a local server for development and can be replaced with `node server.js` calls instead.

#### server.js

Your server.js file contains all of the information necessary to start a server and direct the browser to your content at the specified port:

```
// server.js
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.listen(port);
console.log('server listening on port 8080');
```