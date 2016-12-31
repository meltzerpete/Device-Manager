var deviceMgr = angular.module('deviceMgr', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'ngResource']);

//MAIN APP CONTROLLER
deviceMgr.controller('appCtl', function($scope, $rootScope, $location, $window, staff, loans){

	//member of staff currently logged in
	//TODO must change this when log in system implemented
	$scope.currentUser = staff.find(0);

	//numbers for tabs at top of navbar
	$rootScope.updateNav = function() {
		var requests = [];
		var approved = [];
		var current = [];

		loans.get().$promise.then(function(loanData) {
			loanData.forEach(function(loan) {
				if (loan.approved === null)
				requests.push(loan);
				if (loan.approved === true && loan.dateStarted === null)
				approved.push(loan);
				if (loan.dateStarted && loan.returned === null)
				current.push(loan);
			});
			$rootScope.requestsNo = requests.length;
			$rootScope.approvedNo = approved.length;
			$rootScope.currentNo = current.length;
		});

	};

	//call the update function when first loaded
	$rootScope.updateNav();

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
		//clear any text in search field on page change
		$scope.search = null;

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
