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
		addDevice: function(device) {
			device.deviceID = devices.length;
			devices.push(device);
		},

		get: function() {
			return devices;
		},

		find: function(deviceID) {
			index = devices.findIndex( function(x) {
				return x.deviceID === deviceID;
			});
			return devices[index];
		},

		remove: function(deviceID) {
			index = devices.findIndex( function(x) {
				return x.deviceID === deviceID;
			});
			devices.splice(index, 1);
		}
	};
});
