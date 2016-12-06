var deviceMgr = angular.module('deviceMgr');

//CLIENT SEARCH CONTROLLER
deviceMgr.controller('clientSearchCtl', function($scope, clients) {

	// $scope.setSearch("Search Clients");

	$scope.clients = clients.get();
});
