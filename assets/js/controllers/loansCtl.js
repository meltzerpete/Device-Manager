var deviceMgr = angular.module('deviceMgr');

	//LOANS CONTROLLER
	deviceMgr.controller('loansCtl', function($scope, $rootScope, loans, clients, devices, types, categories) {

		$scope.loans = loans.get();

		//add info about client and device to each request object
		$scope.loans.forEach(function(loan) {

			var client = clients.find(loan.clientID);
			var device = devices.find(loan.deviceID);
			var type = types.find(device.typeID);
			var subCategory = categories.find(type.categoryID);
			var parentCategory = categories.find(subCategory.parentCategoryID);

			loan.clientFirstName = client.clientFirstName;
			loan.clientLastName = client.clientLastName;
			loan.clientType = client.clientType;
			loan.clientEmail = client.clientEmail;
			loan.clientStudentNo = client.clientStudentNo;

			loan.typeName = type.typeName;
			loan.subCategoryName = subCategory.categoryName;
			loan.parentCategoryName = parentCategory.categoryName;
			loan.deviceID = device.deviceID;
			loan.deviceSerial = device.serial;
			loan.deviceDescription = device.description;
			loan.deviceNotes = device.notes;
			loan.defaultLoanTime = device.defaultLoanTime;

			//for filterring current and overdue loans
			if (loan.dateStarted && loan.returned === null) {
				var today = new Date();
				loan.current = true;
				if (today > Date.parse(loan.due)) {
					loan.overdue = true;
					loan.overdueDays =
						today - Date.parse(loan.due) -
							1000*60*60*24;
				} else {
					loan.dueInDays =
						Date.parse(loan.due) - today;
				}
			}
		});

		//REQUESTS

		//deny request function
		$scope.deny = function(request) {
			request.approved = false;
			//update badge in navbar
			$rootScope.updateNav();
		};

		//approve request function
		$scope.approve = function(request) {
			request.approved = true;
			//update badge in navbar
			$rootScope.updateNav();
		};

		//calculate todays date + default loan time
		$scope.defaultReturn = function(loan) {
			var d = new Date();
			return d.setDate(d.getDate() + loan.defaultLoanTime);
		};
});
