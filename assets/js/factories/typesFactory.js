var deviceMgr = angular.module('deviceMgr');

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
			index = types.findIndex(function(x) {
				return x.typeID === typeID;
			});
			return types[index];
		}
	};
});
