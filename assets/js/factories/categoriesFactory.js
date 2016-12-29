var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('categories', function categoriesFactory($resource){

	var Resource = $resource('/api/categories/:id',
		{categoryID: '@id'}, {
			get: {method: 'GET', isArray: true},
			remove: {method: 'DELETE', isArray: false},
			update: {method: 'PUT'}
		});
	return {
		add: function() {
			return new Resource();
		},
		find: function(id) {
			return Resource.get({categoryID: id});
		},
		get: function() {
			return Resource.query();
		},
		remove: function(id) {
			Resource.remove({deviceID: id});
		}
	};

	// return {
	// 	addParent: function(parentCategoryName) {
	// 		var parent = {
	// 			categoryID: categories.length,
	// 			categoryName: parentCategoryName,
	// 			parentCategoryID: null
	// 		};
	// 		categories.push(parent);
	// 	},
	//
	// 	addSub: function(subCategoryName, parentID) {
	// 		var sub = {
	// 			categoryID: categories.length,
	// 			categoryName: subCategoryName,
	// 			parentCategoryID: parentID
	// 		};
	// 		categories.push(sub);
	// 	},
	//
	// 	get: function() {
	// 		return categories;
	// 	},
	//
	// 	//function to return single category
	// 	find: function(categoryID) {
	// 		index = categories.findIndex( function(x) {
	// 			return x.categoryID === categoryID;
	// 		});
	// 		return categories[index];
	// 	}
	// };
});
