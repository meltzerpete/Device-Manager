var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('devices', function devicesFactory($resource){

	var Resource = $resource('/api/devices/:id',
		{deviceID: '@id'}, {
			get: {method: 'GET', isArray: true},
			remove: {method: 'DELETE', isArray: false},
			update: {method: 'PUT'}
		});
		return {
			get: function() {
				return Resource.query();
			},
			find: function(id) {
				return Resource.get({deviceID: id});
			},
			remove: function(id) {
				Resource.remove({deviceID: id});
			}
		};

	// return {
	// 	addDevice: function(device) {
	// 		device.deviceID = devices.length;
	// 		devices.push(device);
	// 	},
	//
	// 	// get: $http.get('/api/devices'),
	//
	// 	find: function(deviceID) {
	// 		index = devices.findIndex( function(x) {
	// 			return x.deviceID === deviceID;
	// 		});
	// 		return devices[index];
	// 	},
	//
	// 	remove: function(deviceID) {
	// 		index = devices.findIndex( function(x) {
	// 			return x.deviceID === deviceID;
	// 		});
	// 		devices.splice(index, 1);
	// 	}
	// };
});
