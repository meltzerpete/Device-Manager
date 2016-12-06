var deviceMgr = angular.module('deviceMgr');

//DEVICES CONTROLLER
deviceMgr.controller('deviceCtl', function($scope, $routeParams, $modal, devices, categories, types) {
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

		$scope.activeParent = (categoryID === null) ? null : categories.find(categoryID);
		$scope.setActiveSub(null);
	};

	//subCategory functions
	$scope.getsubCategory = function(typeID) {
		return categories.find(types.find(typeID).categoryID);
	};

	$scope.setActiveSub = function(categoryID) {
		$scope.activeSub = (categoryID === null) ? null : categories.find(categoryID);
		$scope.setActiveType(null);
	};

	//type functions
	$scope.getType = function(deviceID) {
		return types.find(devices.find(deviceID).typeID);
	};

	$scope.setActiveType = function(typeID) {
		$scope.activeType = (typeID === null) ? null : types.find(typeID);
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

	$scope.addCat = function(addedCategory, addedSub, addedType) {
		if (addedCategory) {
			categories.addParent(addedCategory);
		}
		else if (addedSub) {
			categories.addSub(addedSub, $scope.activeParent.categoryID);
		}
		else if (addedType) {
			types.add(addedType, $scope.activeSub.categoryID);
		}
	};

	$scope.clone = function(deviceToClone) {
		var newDevice = {
			//copy all properties except deviceID
	    description : deviceToClone.description,
	    availableFrom : null,
	    dateOfPurchase : deviceToClone.dateOfPurchase,
	    dateOutOfService : deviceToClone.dateOutOfService,
	    defaultLoanTime : deviceToClone.defaultLoanTime,
	    isWorking : deviceToClone.isWorking,
	    notes : deviceToClone.notes,
	    serial : null,
	    visible : deviceToClone.visible,
	    typeID : deviceToClone.typeID,
			//properties for current view
			loanStatus : "Available Now",
			type : deviceToClone.type,
			subCategory : deviceToClone.subCategory,
			parentCategory : deviceToClone.parentCategory
	  };
		devices.addDevice(newDevice);
	};

	//function for switching in and out of edit mode
	$scope.edit = function (value) {
	$scope.editable = value;
	};

});
