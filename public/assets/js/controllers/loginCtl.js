var deviceMgr = angular.module('deviceMgr');

//CLIENT SEARCH CONTROLLER
deviceMgr.controller('loginCtl', function($scope, $rootScope,
	$location, staff) {

	$scope.login = function() {

		//if username or password not entered then do nothing
		if (!$scope.username || !$scope.password) {
			return;
		}

		//validate user
		staff.get().$promise.then(function(staffMembers) {
			for(var i = 0; i < staffMembers.length; i++) {

				//hash password
				var hpass = sha256($scope.username.toLowerCase() +
					$scope.password);

				if (!staffMembers[i].disabled &&
					($scope.username.toLowerCase() ===
					staffMembers[i].staffEmail.toLowerCase()) &&
					(hpass === staffMembers[i].password)) {
						console.log("verified");
					//validation passed - log in user
					$rootScope.currentUser = staffMembers[i];
					$location.path('/');
					return;
				}
			}

			//validation has failed
			$scope.username = null;
			$scope.password = null;
			//display message to inform user
			$scope.failed = true;
		});
	};
});
