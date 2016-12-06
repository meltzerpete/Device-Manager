var deviceMgr = angular.module('deviceMgr');

//ADD NEW DEVICE CONTROLLER
deviceMgr.controller('newDeviceCtl', function($scope, $routeParams, devices, categories, types) {
	$scope.devices = devices.get();
	$scope.categories = categories.get();
	$scope.types = types.get();

	// $scope.activeDevice = null;

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
		$scope.activeDevice.availableFrom = null;
		$scope.activeDevice.dateOutOfService = null;
		$scope.activeDevice.typeID = $scope.activeType.typeID;
		devices.addDevice($scope.activeDevice);

		$scope.back();
	};

});
