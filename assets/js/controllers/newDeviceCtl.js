var deviceMgr = angular.module('deviceMgr');

//ADD NEW DEVICE CONTROLLER
deviceMgr.controller('newDeviceCtl', function($scope, $routeParams,
	devices, categories, types) {

	//get Resource object and connect it to page model of new device
	$scope.activeDevice = devices.addDevice();

	//get data from server and set up local data model for new device
	devices.get().$promise.then(function(devicesData) {

		types.get().$promise.then(function(typesData) {

			categories.get().$promise.then(function(categoriesData) {

				//store data locally
				$scope.devices = devicesData;
				$scope.types = typesData;
				$scope.categories = categoriesData;

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

				$scope.activeType = $scope.types.find(parseInt($routeParams.id));

				$scope.activeType.subCategory =
					$scope.getsubCategory($scope.activeType.typeID);

				$scope.activeType.parentCategory =
					$scope.getParentCategory($scope.activeType.subCategory.categoryID);

			});	//end of categories.get() function

		}); //end of types.get() function

	}); //end of devices.get() function


	//functions for getting sub/parent categories
	$scope.getParentCategory = function(typeID) {
		return $scope.categories.find($scope.getsubCategory(typeID).parentCategoryID);
	};

	$scope.getsubCategory = function(typeID) {
		return $scope.categories.find($scope.types.find(typeID).categoryID);
	};

	//saves new device when save button is clicked
	$scope.add = function() {
		//add derived information
		$scope.activeDevice.availableFrom = null;
		$scope.activeDevice.dateOutOfService = null;
		$scope.activeDevice.typeID = $scope.activeType.typeID;
		//send new device to server
		$scope.activeDevice.$save();
		//get new instance of addDevice resource
		$scope.activeDevice = devices.addDevice();
		//return to previous page
		$scope.back();
	};

});
