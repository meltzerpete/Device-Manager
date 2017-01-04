var deviceMgr = angular.module('deviceMgr');

	//CLIENT SEARCH CONTROLLER
	deviceMgr.controller('clientProfileCtl', function($scope, $routeParams, clients) {

	//get client
	var getData = function() {
		clients.find(parseInt($routeParams.id)).$promise.then(function(client) {
			$scope.activeClient = client;
			console.log($scope.activeClient);
		});
	};

	getData();

	//function for switching in and out of edit mode
	$scope.edit = function (value) {
	$scope.editable = value;
	};

	$scope.update = function(activeClient) {
		activeClient.$update();
		getData();
	};

});
