var deviceMgr = angular.module('deviceMgr');

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
			index = categories.findIndex( function(x) {
				return x.categoryID === categoryID;
			});
			return categories[index];
		}
	};
});
