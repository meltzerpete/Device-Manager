var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('loans', function devicesFactory($resource){

	var Resource = $resource('api/loans/:id',
		{loanID: '@id'}, {
			get: {method: 'GET', isArray: true},
			remove: {method: 'DELETE', isArray: false},
			update: {method: 'PUT'}
	});

	return {
		add: function() {
			return new Resource();
		},
		find: function(id) {
			return Resource.get({loanID: id});
		},
		get: function() {
			return Resource.query();
		}
	};
});
