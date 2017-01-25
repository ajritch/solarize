var app = angular.module('app', ['ngRoute', 'chart.js']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/design', {
			templateUrl: 'static/partials/design.html'
		})
		.when('/analysis', {
			templateUrl: 'static/partials/analysis.html'
		})
		.otherwise({
			redirectTo: '/design'
		});
});

//service for shared properties
app.service('sharedProperties', function() {
	var properties = {};
	return {
		getProperty: function(key) {
			return properties[key];
		},
		setProperty: function(key, value) {
			properties[key] = value;
		}
	};
});