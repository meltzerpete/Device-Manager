var deviceMgr = angular.module('deviceMgr');

//ADD NEW DEVICE CONTROLLER
deviceMgr.controller('newDeviceCtl', function($scope, $routeParams, devices, categories, types) {
	$scope.devices = devices.get();
	$scope.categories = categories.get();
	$scope.types = types.get();

	//get Resource object and connect it to page model of new device
	$scope.activeDevice = devices.addDevice();

	$scope.getParentCategory = function(typeID) {
		return categories.find($scope.getsubCategory(typeID).parentCategoryID);
	};

	$scope.getsubCategory = function(typeID) {
		return categories.find(types.find(typeID).categoryID);
	};

	$scope.activeType = types.find(parseInt($routeParams.id));

	$scope.activeType.subCategory = $scope.getsubCategory($scope.activeType.typeID);
	$scope.activeType.parentCategory = $scope.getParentCategory($scope.activeType.subCategory.categoryID);

	$scope.add = function() {
		//add derived information
		$scope.activeDevice.availableFrom = null;
		$scope.activeDevice.dateOutOfService = null;
		$scope.activeDevice.typeID = $scope.activeType.typeID;
		//send new device to server
		$scope.activeDevice.$save();
		//get new instance of addDevice resource
		$scope.activeDevice = devices.addDevice();
		//return to provious page
		$scope.back();
	};

});
