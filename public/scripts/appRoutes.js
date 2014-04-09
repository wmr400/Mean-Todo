angular.module('appRoutes', [])

	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/partials/main.html',
			controller: 'MainController'
		})

		.when('/about', {
			templateUrl: 'views/partials/about.html',
			controller: 'MainController'
		});

	$locationProvider.html5Mode(true);

}]);