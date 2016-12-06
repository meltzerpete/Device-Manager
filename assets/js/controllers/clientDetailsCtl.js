var deviceMgr = angular.module('deviceMgr');

	//CLIENT SEARCH CONTROLLER
	deviceMgr.controller('clientDetailsCtl', function($scope, $routeParams, devices, types) {

	//get device
	$scope.device = devices.find(parseInt($routeParams.id));

	console.log($scope.device);

	$scope.device.typeName = types.find(parseInt($scope.device.typeID)).typeName;

	$scope.makeRequest = function() {

	};

});
