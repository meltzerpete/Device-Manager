var deviceMgr = angular.module('deviceMgr');

//CLIENT SEARCH CONTROLLER
deviceMgr.controller('clientSearchCtl', function($scope, clients) {

	clients.get().$promise.then(function(allClients) {
		$scope.clients = allClients;
	});
});
