var deviceMgr = angular.module('deviceMgr');

deviceMgr.config( function($routeProvider, $locationProvider){
	$routeProvider
	.when('/', {

		templateUrl: 'assets/partials/dashboard.html'
	})
	.when('/approved', {

		templateUrl: 'assets/partials/approved.html'
	})
	.when('/changepassword', {

		templateUrl: 'assets/partials/changepassword.html'
	})
	.when('/client', {
		controller: 'deviceCtl',
		templateUrl: 'assets/partials/client.html'
	})
	.when('/clientSearch', {
		controller: 'clientSearchCtl',
		templateUrl: 'assets/partials/clientSearch.html'
	})
	.when('/clientDetails/:id', {
		controller: 'clientDetailsCtl',
		templateUrl: 'assets/partials/clientDetails.html'
	})
	.when('/clientDeviceDetails/:id', {
		controller: 'deviceCtl',
		templateUrl: 'assets/partials/clientDeviceDetails.html'
	})
	.when('/clientProfile/:id', {
		controller: 'clientProfileCtl',
		templateUrl: 'assets/partials/clientProfile.html'
	})
	.when('/currentLoans', {

		templateUrl: 'assets/partials/currentLoans.html'
	})
	.when('/dashboard', {

		templateUrl: 'assets/partials/dashboard.html'
	})
	.when('/deviceDetails/:id', {
		controller: 'deviceCtl',
		templateUrl: 'assets/partials/deviceDetails.html'
	})
	.when('/editDeviceDetails/:id', {
		controller: 'deviceCtl',
		templateUrl: 'assets/partials/editDeviceDetails.html'
	})
	.when('/login', {

		templateUrl: 'assets/partials/loginpage.html'
	})
	.when('/manage', {
		controller : 'deviceCtl',
		templateUrl: 'assets/partials/manage.html'
	})
	.when('/newDevice/:id', {
		controller : 'newDeviceCtl',
		templateUrl: 'assets/partials/newDevice.html'
	})
	.when('/requests', {

		templateUrl: 'assets/partials/requests.html'
	})
	.otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: true
	});
});
