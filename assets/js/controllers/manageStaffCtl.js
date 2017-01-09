var deviceMgr = angular.module('deviceMgr');

//CLIENT SEARCH CONTROLLER
deviceMgr.controller('manageStaffCtl',
		function($scope, staff) {

			$scope.editable = null;

			//function to get data from the server
			var getData = function() {
				staff.get().$promise.then(function(staffData) {
					$scope.staff = staffData;
				});
			};

			//pull data from server when page loads
			getData();

			//function to make row editable
			$scope.edit = function(staffMember) {
				if ($scope.new) {
					//create new entry
					$scope.new = false;
					staffMember.$save();
					getData();
				} else {
					//edit existing row
					if ($scope.editable === staffMember.staffID) {
						//make uneditable and submit changes
						$scope.editable = null;
						staffMember.$update();
						getData();
					} else {
						//make editable
						$scope.editable = staffMember.staffID;
						getData();
					}
				}

			};

			//cancel editing a row
			$scope.cancel = function() {
				$scope.editable = null;
				$scope.new = false;
				getData();
			};

			//function to reset users password to "password"
			$scope.resetPassword = function(staffMember) {
				staffMember.password = sha256(staffMember.staffEmail.toLowerCase() + "password");
				staffMember.$update();
				getData();
				alert("Password Reset");
			};

			//function to add a new row
			$scope.newStaff = function() {
				$scope.new = true;
				var newMember = staff.add();
				newMember.staffID = null;
				$scope.staff.push(newMember);
			};

});
