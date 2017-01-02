var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('staff', function devicesFactory($resource){

	var Resource = $resource('/api/staff/:id',
		{staffID: '@id'}, {
			get: {method: 'GET', isArray: false},
			remove: {method: 'DELETE', isArray: false},
			update: {method: 'PUT'}
	});

	return {
		add: function() {
			return new Resource();
		},
		find: function(id) {
			return Resource.get({staffID: id});
		},
		get: function() {
			return Resource.query();
		},
		remove: function(id) {
			Resource.remove({staffID: id});
		}
	};
	
});
