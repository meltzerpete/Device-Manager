var deviceMgr = angular.module('deviceMgr', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap']);

//MAIN APP CONTROLLER
deviceMgr.controller('appCtl', function($scope, $location, $window){

	//Function to change search placeholder depending on current view
	$scope.$on("$routeChangeSuccess", function() {

		$scope.placeholder = "Search";

		if ($location.path() == '/clientSearch') {
			$scope.placeholder = "Search Clients";
		} else if ($location.path() == '/manage') {
			$scope.placeholder = "Search Devices";
		}

		var myEl = angular.element( document.querySelector( '#searchInput' ) );
		myEl.attr('placeholder', $scope.placeholder);

	});

	//Set active links on navbar depending on current view
	$scope.pageClass = function(path){
		return (path == $location.path()) ? 'active' : '';
	};

	//Function to go back to previous page at any given time
	$scope.back = function() {
		$window.history.back();
	};
});