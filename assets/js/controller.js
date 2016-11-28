angular.module('deviceMgr', ['ngRoute'])

.config( function($routeProvider){
	$routeProvider
	.when('/', {

		templateUrl: 'assets/partials/loginpage.html'
	})
	.when('/approved', {

		templateUrl: 'assets/partials/approved.html'
	})
	.when('/client', {

		templateUrl: 'assets/partials/client.html'
	})
	.when('/clientDetails', {

		templateUrl: 'assets/partials/clientDetails.html'
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
//	$locationProvider.html5Mode(true);
});
