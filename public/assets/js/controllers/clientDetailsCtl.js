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

		var fClients;
		clients.get().$promise.then(function(allClients) {
			fClients = allClients.filter(function(client) {
				return $scope.client.clientEmail === client.clientEmail;
			});

			if (fClients.length > 0) {
				console.log(fClients);
				//client already exists
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
					clientID: fClients[0].clientID,
					staffID: null
				};

				var newRequest = loans.add();
				newRequest = Object.assign(newRequest, request);
				newRequest.$save();

				//navigate back to client home page
				$location.path('/client');

				//update navbar badges
				$rootScope.updateNav();

			} else {
				//clieant does not yet exist - create new
				var newClient = clients.add();
				newClient.clientFirstName = $scope.client.clientFirstName;
				newClient.clientLastName = $scope.client.clientLastName;
				newClient.clientCourse = $scope.client.clientCourse;
				newClient.clientSupervisor = $scope.client.clientSupervisor;
				newClient.clientType = $scope.client.clientType;
				newClient.clientStudentNo = $scope.client.clientStudentNo;
				newClient.clientEmail = $scope.client.clientEmail;
				newClient.$save().then(function(res) {
					var length = $scope.selectedDate.getFullYear() +
					"/" + ($scope.selectedDate.getMonth() + 1) +
					"/" + $scope.selectedDate.getDate();
					console.log("res: ------ :");
					console.log(res);
					console.log(res.clientID);
					console.log(res.insertId);
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
						clientID: res.insertId,
						staffID: null
					};

					var newRequest = loans.add();
					newRequest = Object.assign(newRequest, request);
					newRequest.$save();

					//navigate back to client home page
					$location.path('/client');

					//update navbar badges
					$rootScope.updateNav();

				});	//end newClient.$save()

			}	//end else

		});	//end clients.get()

	};

});
