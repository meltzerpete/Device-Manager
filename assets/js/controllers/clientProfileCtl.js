var deviceMgr = angular.module('deviceMgr');

	//CLIENT SEARCH CONTROLLER
	deviceMgr.controller('clientProfileCtl', function($scope, $routeParams, clients) {

	//get device
	$scope.activeClient = clients.find(parseInt($routeParams.id));
});
