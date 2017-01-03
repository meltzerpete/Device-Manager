var deviceMgr = angular.module('deviceMgr', ['ngRoute', 'ngSanitize', 'mgcrea.ngStrap', 'ngResource']);

//MAIN APP CONTROLLER
deviceMgr.controller('appCtl', function($scope, $rootScope,
	$location, $window, $http, staff, loans){

	//member of staff currently logged in
	if (!$rootScope.currentUser) {
		//TODO remove me!!
		$rootScope.currentUser = staff.find(0);

		$location.path('/client');
	}

	//function for logging out
	$scope.logout = function() {
		$rootScope.currentUser = null;
		$location.path('login');
	};

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
		$scope.search = "";

		//set scroll-bars to display where appropriate
		$scope.bodyStyle = {'overflow-y': 'auto'};

	});

	//Set active links on navbar depending on current view
	$scope.pageClass = function(path){
		return (path == $location.path()) ? 'active' : '';
	};

	//Function to go back to previous page at any given time
	$scope.back = function() {
		$window.history.back();
	};

	//global function to send email
	$rootScope.sendEmail = function(address, subject, message) {

		var data = {
			//address: address,
			//address for testing
			address: 'meltzerpete@gmail.com',
			subject: subject,
			message: message
		};

		$http.post('/sendEmail', JSON.stringify(data)).
    success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
      //  alert(data.resMessage);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
			//	alert(data.resMessage);
      });

	};

});
