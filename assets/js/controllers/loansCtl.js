var deviceMgr = angular.module('deviceMgr');

	//LOANS CONTROLLER
	deviceMgr.controller('loansCtl', function($scope, $rootScope, loans,
		clients, devices, types, categories) {

		$scope.loans = loans.get();

		//get data and store locally

		$scope.clients = clients.get();

		$scope.categories = categories.get();

		devices.get().$promise.then(function(devicesData) {

			types.get().$promise.then(function(typesData) {

				//assign data from get requests to local copy
				$scope.devices = devicesData;
				$scope.types = typesData;

				//find functions
				//devices
				$scope.devices.find = function(deviceID) {
					var d = $scope.devices.filter(function(device) {
						return device.deviceID === deviceID;
					});
					return d[0];
				};
				//types
				$scope.types.find = function(typeID) {
					var t = $scope.types.filter(function(type) {
						return type.typeID === typeID;
					});
					return t[0];
				};
				//categories
				$scope.categories.find = function(categoryID) {
					var c = $scope.categories.filter(function(category) {
						return category.categoryID === categoryID;
					});
					return c[0];
				};

				//add info about client and device to each request object
				$scope.loans.forEach(function(loan) {

					var client = clients.find(loan.clientID);
					var device = $scope.devices.find(loan.deviceID);
					var type = $scope.types.find(device.typeID);
					var subCategory = $scope.categories.find(type.categoryID);
					var parentCategory = $scope.categories.find(subCategory.parentCategoryID);

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

			}); //end of types.get() function

		}); //end of devices.get() function


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
