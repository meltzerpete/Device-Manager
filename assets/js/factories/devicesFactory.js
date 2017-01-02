var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('devices', function devicesFactory($resource){

	var Resource = $resource('/api/devices/:id',
		{deviceID: '@id'}, {
			get: {method: 'GET', isArray: false},
			remove: {method: 'DELETE', isArray: false},
			update: {method: 'PUT'}
	});
	
	return {
		addDevice: function() {
			return new Resource();
		},
		find: function(id) {
			return Resource.get({deviceID: id});
		},
		get: function() {
			return Resource.query();
		},
		remove: function(id) {
			Resource.remove({deviceID: id});
		}
	};

});
