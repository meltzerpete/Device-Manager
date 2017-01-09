var deviceMgr = angular.module('deviceMgr');

//DEVICES CONTROLLER
deviceMgr.controller('deviceCtl', function($scope, $routeParams,
	$modal, $timeout, $filter, devices, categories, types) {

	//set actives to null
	$scope.activeParent = null;
	$scope.activeSub = null;
	$scope.activeType = null;
	$scope.activeDevice = null;

	var getData = function() {

		devices.get().$promise.then(function(devicesData) {

			types.get().$promise.then(function(typesData) {

				categories.get().$promise.then(function(categoriesData) {

					//runs when all data is returns from API

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

					//add loan status information to devices in scope
					$scope.devices.forEach(function (device) {

						device.loanStatus = $scope.getLoanStatus(device);
						device.type = $scope.types.find(device.typeID);
						device.subCategory = $scope.getsubCategory(device.typeID);
						device.parentCategory = $scope.getParentCategory(device.typeID);
						device.dateOfPurchase = $filter('date')(device.dateOfPurchase, "dd/MM/yyyy");
					});

					//set active device if route parameters specified
					if ($routeParams.id) {
						var d = $scope.devices.filter(function(device){
							return device.deviceID === parseInt($routeParams.id);
						});
						$scope.activeDevice = d[0];
					}

				});	//end of categories.get() function

			}); //end of types.get() function

		}); //end of devices.get() function

	}; //end of getData() function



	//function to get loan status
	$scope.getLoanStatus = function(device) {
		if (device.dateOutOfService !== null) {
			return "Out of service";
		} else if (device.availableFrom === null) {
			return "Available now";
		} else if (device.availableFrom !== null) {
			var fdate = $filter('date')(device.availableFrom, "dd/MM/yyyy");
			return `Available from: ${fdate}`;
		}
	};

	//parent category functions
	$scope.getParentCategory = function(typeID) {
		return $scope.categories.find($scope.getsubCategory(typeID).parentCategoryID);
	};

	$scope.setActiveParent = function(categoryID) {

		$scope.activeParent = (categoryID === null) ? null : $scope.categories.find(categoryID);
		$scope.setActiveSub(null);
	};

	//subCategory functions
	$scope.getsubCategory = function(typeID) {
		return $scope.categories.find($scope.types.find(typeID).categoryID);
	};

	$scope.setActiveSub = function(categoryID) {
		$scope.activeSub = (categoryID === null) ? null : $scope.categories.find(categoryID);
		$scope.setActiveType(null);
	};

	//type functions
	$scope.getType = function(deviceID) {
		return $scope.types.find($scope.devices.find(deviceID).typeID);
	};

	$scope.setActiveType = function(typeID) {
		$scope.activeType = (typeID === null) ? null : $scope.types.find(typeID);
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
		$scope.activeDevice = $scope.devices.find(deviceID);
	};

	$scope.removeDevice = function(deviceID) {
		//remove from server
		devices.remove(deviceID);
		//return to previous page
		$scope.back();
	};


	//function for adding new categories/types
	$scope.addCat = function(addedCategory, addedSub, addedType) {

		if (addedCategory) {
			var category = categories.add();
			category.categoryName = addedCategory;
			category.parentCategoryID = null;
			//send to server
			category.$save();
			//update local data model
			getData();
		}
		else if (addedSub) {
			var subCategory = categories.add();
			subCategory.categoryName = addedSub;
			subCategory.parentCategoryID = $scope.activeParent.categoryID;
			//send to server
			subCategory.$save();
			//update local data model
			getData();
		}
		else if (addedType) {
			var type = types.add();
			type.typeName = addedType;
			type.categoryID = $scope.activeSub.categoryID;
			//send to server
			type.$save();
			//update local data model
			getData();
		}
	};

	//function to clone device
	$scope.clone = function(deviceToClone) {
		var obj = devices.addDevice();

		newDevice = {
			//copy relevant properties
	    description : deviceToClone.description,
	    availableFrom : null,
	    dateOfPurchase : deviceToClone.dateOfPurchase,
	    dateOutOfService : null,
	    defaultLoanTime : deviceToClone.defaultLoanTime,
	    isWorking : true,
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

		//send to server
		var copy = Object.assign(obj, newDevice);
		copy.$save();

		//update local data model
		getData();

	};

	//function for switching in and out of edit mode
	$scope.edit = function (value) {
	$scope.editable = value;
	};

	//function for updating edited device
	$scope.update = function() {
		$timeout(function() {
			var copy =  angular.copy($scope.activeDevice);
			delete copy.type;
			delete copy.loanStatus;
			delete copy.subCategory;
			delete copy.parentCategory;
			copy.$update();
		}, 0);
	};

	//get data from server when page loads
	getData();

	//function for populating isWorking combobox
	$scope.boolToStrWorking = function(arg) {
		return arg ? 'Working' : 'Needs Repair';
	};

	//function for populating visible combobox
	$scope.boolToStr = function(arg) {
		return arg ? 'Yes' : 'No';
	};

});
