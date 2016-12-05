var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('devices', function devicesFactory(){
	var devices = [
		{
	    deviceID : 0,
	    description : "iOS 10 installed",
	    availableFrom : null,
	    dateOfPurchase : "2015-08-02",
	    dateOutOfService : null,
	    defaultLoanTime : 30,
	    isWorking : true,
	    notes : "working fine",
	    serial : "3874-2873-2938-0091",
	    visible : true,
	    typeID : 0
	  },
	  {
	    deviceID : 1,
	    availableFrom : "2016-12-15",
	    dateOfPurchase : "2015-07-09",
	    dateOutOfService : null,
	    defaultLoanTime : 30,
	    isWorking : true,
	    notes : "slight crack on screen",
	    serial : "2234-8736-2983-0032",
	    visible : true,
	    typeID : 0
	  },
	  {
	    deviceID : 2,
	    description : "",
	    availableFrom : null,
	    dateOfPurchase : "2016-03-01",
	    dateOutOfService : null,
	    defaultLoanTime : 20,
	    isWorking : true,
	    notes : "working fine",
	    serial : "123-987",
	    visible : true,
	    typeID : 4
	  },
	  {
	    deviceID : 3,
	    description : "",
	    availableFrom : null,
	    dateOfPurchase : "2016-04-15",
	    dateOutOfService : "2016-05-01",
	    defaultLoanTime : 20,
	    isWorking : false,
	    notes : "completely broken - thrown away",
	    serial : "1234-5678",
	    visible : false,
	    typeID : 4
	  },
	  {
	    deviceID : 4,
	    description : "",
	    availableFrom : "2016-12-18",
	    dateOfPurchase : "2016-04-02",
	    dateOutOfService : null,
	    defaultLoanTime : 20,
	    isWorking : true,
	    notes : "working fine",
	    serial : "0987-0987",
	    visible : true,
	    typeID : 4
	  }
	];
	return {
		get: function() {
			return devices;
		},
		find: function(deviceID) {
			index = devices.findIndex(function(x) { return x.deviceID === deviceID; });
			return devices[index];
		},
		remove: function(deviceID) {
			index = devices.findIndex(function(x) { return x.deviceID === deviceID; });
			devices.splice(index, 1);
		}
	};
});

deviceMgr.factory('categories', function categoriesFactory(){
	var categories = [
		{
	    categoryID : 0,
	    categoryName : "Phones",
	    parentCategoryID : null
	  },
	  {
	    categoryID : 1,
	    categoryName : "Tablets",
	    parentCategoryID : null
	  },
	  {
	    categoryID : 2,
	    categoryName : "VR Devices",
	    parentCategoryID : null
	  },
	  {
	    categoryID : 3,
	    categoryName : "Apple",
	    parentCategoryID : 0
	  },
	  {
	    categoryID : 4,
	    categoryName : "Nokia",
	    parentCategoryID : 0
	  },
	  {
	    categoryID : 5,
	    categoryName : "Samsung",
	    parentCategoryID : 0
	  },
	  {
	    categoryID : 6,
	    categoryName : "Apple",
	    parentCategoryID : 1
	  },
	  {
	    categoryID : 7,
	    categoryName : "Nexus",
	    parentCategoryID : 1
	  },
	  {
	    categoryID : 8,
	    categoryName : "Oculus",
	    parentCategoryID : 2
	  },
	  {
	    categoryID : 9,
	    categoryName : "Samsung",
	    parentCategoryID : 2
	  }
	];
	return {
		addParent: function(parentCategoryName) {
			var parent = {
				categoryID: categories.length,
				categoryName: parentCategoryName,
				parentCategoryID: null
			};
			categories.push(parent);
		},

		addSub: function(subCategoryName, parentID) {
			var sub = {
				categoryID: categories.length,
				categoryName: subCategoryName,
				parentCategoryID: parentID
			};
			categories.push(sub);
		},

		get: function() {
			return categories;
		},

		//function to return single category
		find: function(categoryID) {
			index = categories.findIndex(function(x) { return x.categoryID === categoryID; });
			return categories[index];
		}
	};
});

deviceMgr.factory('types', function typesFactory(){
	var types = [
		{
	    typeID : 0,
	    typeName : "iPhone 5",
	    categoryID : 3
	  },
	  {
	    typeID : 1,
	    typeName : "iPhone 6",
	    categoryID : 3
	  },
	  {
	    typeID : 2,
	    typeName : "Lumia",
	    categoryID : 4
	  },
	  {
	    typeID : 3,
	    typeName : "3210",
	    categoryID : 4
	  },
	  {
	    typeID : 4,
	    typeName : "S6",
	    categoryID : 5
	  },
	  {
	    typeID : 5,
	    typeName : "S7 Edge",
	    categoryID : 5
	  },
	  {
	    typeID : 6,
	    typeName : "iPad Mini",
	    categoryID : 6
	  },
	  {
	    typeID : 7,
	    typeName : "iPad 3",
	    categoryID : 6
	  },
	  {
	    typeID : 8,
	    typeName : "Rift 1",
	    categoryID : 8
	  },
	  {
	    typeID : 9,
	    typeName : "Rift 2",
	    categoryID : 8
	  }
	];
	return {
		add: function(typeName, categoryID) {
			var type = {
				typeID: types.length,
				typeName: typeName,
				categoryID: categoryID
			};
			types.push(type);
		},

		get: function() {
			return types;
		},

		//function to return single type
		find: function(typeID) {
			//index = types.findIndex(x => x.typeID == typeID);
			index = types.findIndex(function(x) { return x.typeID === typeID; });
			return types[index];
		}
	};
});
