var deviceMgr = angular.module('deviceMgr');

//CLIENT SEARCH CONTROLLER
deviceMgr.controller('clientDetailsCtl',
		function($scope, $routeParams, $location,
		$rootScope, devices, types, loans, clients) {

	//get device
	devices.find(parseInt($routeParams.id)).$promise.then(function(device) {
		$scope.device = device;

		types.find(device.typeID).$promise.then(function(type) {
			$scope.device.typeName = type.typeName;
		});
	});

	//function to return soonest available date for return request date
	$scope.parseDate = function(date) {
		var d = new Date();
		return date ? Date.parse(date) : d.toString();
	};

	$scope.makeRequest = function() {
		//TODO check if email already exists
		var newClient = clients.add();
		newClient.clientFirstName = $scope.client.clientFirstName || null;
		newClient.clientLastName = $scope.client.clientLastName || null;
		newClient.clientCourse = $scope.client.clientCourse || null;
		newClient.clientSupervisor = $scope.client.clientSupervisor || null;
		newClient.clientType = $scope.client.clientType || null;
		newClient.clientStudentNo = $scope.client.clientStudentNo || null;
		newClient.clientEmail = $scope.client.clientEmail || null;
		newClient.$save().then(function(res) {
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
				clientID: res.clientID,
				staffID: null
			};

			var newRequest = loans.add();
			newRequest = Object.assign(newRequest, request);
			newRequest.$save();

			//navigate back to client home page
			$location.path('/client');

			//only needed for testing purposes
			$rootScope.updateNav();
		});

	};

});
