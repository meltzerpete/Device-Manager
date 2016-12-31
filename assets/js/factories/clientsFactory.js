var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('clients', function devicesFactory($resource){

	var Resource = $resource('api/clients/:id',
		{clientID: '@id'}, {
			get: {method: 'GET', isArray: true},
			remove: {method: 'DELETE', isArray: false},
			update: {method: 'PUT'}
	});

	return {
		add: function() {
			return new Resource();
		},
		find: function(id) {
			return Resource.get({clientID: id});
		},
		get: function() {
			return Resource.query();
		}
	};
});

// 	return {
// 		add: function(client) {
// 			client.clientID = clients.length;
// 			clients.push(client);
// 		},
//
// 		get: function() {
// 			return clients;
// 		},
//
// 		find: function(clientID) {
// 			index = clients.findIndex( function(x) {
// 				return x.clientID === clientID;
// 			});
// 			return clients[index];
// 		}
// 	};
// });
