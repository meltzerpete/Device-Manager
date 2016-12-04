var deviceMgr = angular.module('deviceMgr', ['ngRoute']);

deviceMgr.controller('appCtl', function($scope, $location, $window){
	$scope.pageClass = function(path){
		return (path == $location.path()) ? 'active' : '';
	};

	$scope.back = function() {
		$window.history.back();
	};
});

deviceMgr.controller('deviceCtl', function($scope, $routeParams, devices, categories, types) {
	$scope.devices = devices.get();
	$scope.categories = categories.get();
	$scope.types = types.get();

	//function to get loan status
	$scope.getLoanStatus = function(device) {
		if (device.dateOutOfService !== null) {
			return "Out of service";
		} else if (device.availableFrom === null) {
			return "Available now";
		} else if (device.availableFrom !== null) {
			return `Available from: ${device.availableFrom}`;
		}
	};

	//set actives to null
	$scope.activeParent = null;
	$scope.activeSub = null;
	$scope.activeType = null;
	$scope.activeDevice = null;

	//parent category functions
	$scope.getParentCategory = function(typeID) {
		return categories.find($scope.getsubCategory(typeID).parentCategoryID);
	};

	$scope.setActiveParent = function(categoryID) {
		$scope.activeParent = categories.find(categoryID);
		$scope.setActiveSub(null);
	};

	$scope.checkActiveParent = function(categoryID) {
		if ($scope.activeParent === null) {
			return false;
		}
		else {
			return (categoryID === $scope.activeParent.categoryID) ? true : false;
		}
	};

	//subCategory functions
	$scope.getsubCategory = function(typeID) {
		return categories.find(types.find(typeID).categoryID);
	};

	$scope.setActiveSub = function(categoryID) {
		$scope.activeSub = (categoryID === null) ? null : categories.find(categoryID);
		$scope.setActiveType(null);
	};

	$scope.checkActiveSub = function(categoryID) {
		if ($scope.activeSub === null) {
			return false;
		}
		else {
			return (categoryID === $scope.activeSub.categoryID) ? true : false;
		}
	};

	//type functions
	$scope.getType = function(deviceID) {
		return types.find(devices.find(deviceID).typeID);
	};

	$scope.setActiveType = function(typeID) {
		$scope.activeType = (typeID === null) ? null : types.find(typeID);
		//console.log("type: " + $scope.activeType);
		$scope.setActiveDevice(null);
	};

	$scope.checkActiveType = function(typeID) {
		if ($scope.activeType === null){
			return false;
		}
		else {
			return (typeID === $scope.activeType.typeID) ? true : false;
		}
	};

	//functions for device
	$scope.setActiveDevice = function(deviceID) {
		$scope.activeDevice = devices.find(deviceID);
	};

	$scope.activeDevice = devices.find(parseInt($routeParams.id));

	$scope.removeDevice = function(deviceID) {
		$scope.setActiveDevice(deviceID > 0 ? deviceID - 1 : deviceID + 1);
		devices.remove(deviceID);
		$scope.back();
	};

	//add derived loan status to each device object
	$scope.devices.forEach(function (device) {
		device.loanStatus = $scope.getLoanStatus(device);
		device.type = $scope.getType(device.deviceID);
		device.subCategory = $scope.getsubCategory(device.typeID);
		device.parentCategory = $scope.getParentCategory(device.typeID);
	});

});
