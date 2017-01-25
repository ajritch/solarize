var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.listen(7001, function() {
	console.log('listening on port 7001');
});