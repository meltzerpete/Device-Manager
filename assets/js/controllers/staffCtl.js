var deviceMgr = angular.module('deviceMgr');

	//CLIENT SEARCH CONTROLLER
	deviceMgr.controller('staffCtl', function($scope, $rootScope,
		$location, staff) {

	//CHANGE PASSWORD
	$scope.changePassword = function() {

		//if any fields are return with message
		if (!$scope.oldPassword || !$scope.newPassword ||
			!$scope.reenterPassword) {
			$scope.message = "You must complete all fields.";
			return;
		}

		//if new passwords do not match return with message
		if ($scope.newPassword != $scope.reenterPassword) {
			$scope.message = "The new passwords you have entered do not match.";
			return;
		}

		staff.find($rootScope.currentUser.staffID)
			.$promise.then(function(staffMember) {

			//check current password is correct
			var hCurrentPass = sha256($rootScope.currentUser.staffEmail +
				$scope.oldPassword);

			if (hCurrentPass === staffMember.password) {
				//password match
				var hNewPass = sha256($rootScope.currentUser.staffEmail +
					$scope.newPassword);
				staffMember.password = hNewPass;
				staffMember.$update();
				alert("Password changed successfully.");
				$location.path('/');

			} else {
				$scope.message = "Incorrect password.";
			}

		});
	};


});
