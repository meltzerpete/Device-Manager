var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('types', function typesFactory($resource){

	var Resource = $resource('/api/types/:id',
		{typeID: '@id'}, {
			get: {method: 'GET', isArray: false},
			remove: {method: 'DELETE', isArray: false},
			update: {method: 'PUT'}
		});
		return {
			add: function() {
				return new Resource();
			},
			find: function(id) {
				return Resource.get({typeID: id});
			},
			get: function() {
				return Resource.query();
			},
			remove: function(id) {
				Resource.remove({typeID: id});
			}
		};

});
