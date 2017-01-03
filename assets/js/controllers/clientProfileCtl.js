var deviceMgr = angular.module('deviceMgr');

	//CLIENT SEARCH CONTROLLER
	deviceMgr.controller('clientProfileCtl', function($scope, $routeParams, clients) {

	//get client
	clients.find(parseInt($routeParams.id)).$promise.then(function(client) {
		$scope.activeClient = client;
		console.log($scope.activeClient);
	});
	//function for switching in and out of edit mode
	$scope.edit = function (value) {
	$scope.editable = value;
	};

});
