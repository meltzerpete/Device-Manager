angular.module('deviceMgr', ['ngRoute'])

.config( function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {

		templateUrl: 'assets/partials/dashboard.html'
	})
	.when('/approved', {

		templateUrl: 'assets/partials/approved.html'
	})
	.when('/client', {

		templateUrl: 'assets/partials/client.html'
	})
	.when('/clientSearch', {

		templateUrl: 'assets/partials/clientSearch.html'
	})
	.when('/clientDetails', {

		templateUrl: 'assets/partials/clientDetails.html'
	})
	.when('/currentLoans', {

		templateUrl: 'assets/partials/currentLoans.html'
	})
	.when('/login', {

		templateUrl: 'assets/partials/loginpage.html'
	})
	.when('/manage', {

		templateUrl: 'assets/partials/manage.html'
	})
	.when('/profile', {

		templateUrl: 'assets/partials/profile.html'
	})
	.when('/requests', {

		templateUrl: 'assets/partials/requests.html'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});
