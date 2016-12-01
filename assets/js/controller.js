var deviceMgr = angular.module('deviceMgr', ['ngRoute']);

deviceMgr.config( function($routeProvider, $locationProvider){
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
	.when('/dashboard', {

		templateUrl: 'assets/partials/dashboard.html'
	})
	.when('/login', {

		templateUrl: 'assets/partials/loginpage.html'
	})
	.when('/manage', {
		controller : 'deviceCtl',
		templateUrl: 'assets/partials/manage.html'
	})
	.when('/profile', {

		templateUrl: 'assets/partials/profile.html'
	})
	.when('/requests', {

		templateUrl: 'assets/partials/requests.html'
	})
	.otherwise({
		redirectTo: 'assets/partials/dashboard.html'
	});
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});

deviceMgr.controller('appCtl', function($scope, $location){
	$scope.pageClass = function(path){
		return (path == $location.path()) ? 'active' : '';
	};
});

deviceMgr.controller('deviceCtl', function($scope, devices, categories, types) {
	$scope.devices = devices.get();
	$scope.categories = categories.get();
	$scope.types = types.get();

	//set actives to null
	$scope.activeParent = null;
	$scope.activeSub = null;
	$scope.activeType = null;
	$scope.activeDevice = null;

	//parent category functions
	$scope.getParentCategory = function(typeID) {
		return categories.find($scope.getSubCategory(typeID).parentCategoryID);
	};

	$scope.setActiveParent = function(categoryID) {
		$scope.activeParent = categories.find(categoryID);
		$scope.setActiveSub(null);
	};

	$scope.checkActiveParent = function(categoryID) {
		if ($scope.activeParent === null) {
			return false;
		}
		else {
			return (categoryID === $scope.activeParent.categoryID) ? true : false;
		}
	};

	//subcategory functions
	$scope.getSubCategory = function(typeID) {
		return categories.find(types.find(typeID).categoryID);
	};

	$scope.setActiveSub = function(categoryID) {
		$scope.activeSub = (categoryID === null) ? null : categories.find(categoryID);
		$scope.setActiveType(null);
	};

	$scope.checkActiveSub = function(categoryID) {
		if ($scope.activeSub === null) {
			return false;
		}
		else {
			return (categoryID === $scope.activeSub.categoryID) ? true : false;
		}
	};

	//type functions
	$scope.getType = function(deviceID) {
		return types.find(devices.find(deviceID).typeID);
	};

	$scope.setActiveType = function(typeID) {
		$scope.activeType = (typeID === null) ? null : types.find(typeID);
		console.log("type: " + $scope.activeType);
		$scope.setActiveDevice(null);
	};

	$scope.checkActiveType = function(typeID) {
		if ($scope.activeType === null){
			return false;
		}
		else {
			return (typeID === $scope.activeType.typeID) ? true : false;
		}
	};

	//functions for device
	$scope.setActiveDevice = function(deviceID) {
		$scope.activeDevice = (deviceID === null) ? null : devices.find(deviceID);
	};

	//function to get loan status
	$scope.getLoanStatus = function(device) {
		if (device.dateOutOfService !== null) {
			return "Out of service";
		} else if (device.availableFrom === null) {
			return "Available now";
		} else if (device.availableFrom !== null) {
			return `Available from: ${device.availableFrom}`;
		}
	};

});
