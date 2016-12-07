var deviceMgr = angular.module('deviceMgr');

//CLIENT SEARCH CONTROLLER
deviceMgr.controller('clientDetailsCtl',
		function($scope, $routeParams, $location,
		$rootScope, devices, types, loans, clients) {

	//get device
	$scope.device = devices.find(parseInt($routeParams.id));
	//add typeName to device object
	$scope.device.typeName = types.find(parseInt($scope.device.typeID)).typeName;

	//function to return soonest available date for return request date
	$scope.parseDate = function(date) {
		var d = new Date();
		return date ? Date.parse(date) : d.toString();
	};

	$scope.makeRequest = function() {

		clients.add($scope.client);
		var length = $scope.selectedDate.getFullYear() +
		"/" + ($scope.selectedDate.getMonth() + 1) +
		"/" + $scope.selectedDate.getDate();

		var request = {
	    due : null,
	    dateStarted : null,
	    extensionRequested: false,
	    returned: null,
	    onTheFly: false,
	    damageReported: null,
	    approved: null,
	    length: length,
	    deviceID: $scope.device.deviceID,
	    clientID: $scope.client.clientID,
	    staffID: null
		};

		loans.add(request);
		$location.path('/client');

		//only needed for testing purposes
		$rootScope.updateNav();

	};

});
