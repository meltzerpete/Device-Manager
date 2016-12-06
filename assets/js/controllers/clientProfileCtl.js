var deviceMgr = angular.module('deviceMgr');

	//CLIENT SEARCH CONTROLLER
	deviceMgr.controller('clientProfileCtl', function($scope, $routeParams, clients) {

	//get device
	$scope.activeClient = clients.find(parseInt($routeParams.id));

	//function for switching in and out of edit mode
	$scope.edit = function (value) {
		$scope.editable = value;
	};

});
