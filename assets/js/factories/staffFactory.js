var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('staff', function devicesFactory(){
	var staff = [
		{
	    staffID : 0,
	    staffFirstName : "Harry",
	    staffLastName : "Jones",
	    password: "12345678",
	    isAdmin: true,
	    staffEmail:"harry.jones@ucl.ac.uk"
	  },
	  {
	    staffID : 1,
	    staffFirstName : "Sue",
	    staffLastName : "McCarthy",
	    password: "12345678",
	    isAdmin: false,
	    staffEmail:"sue.mccarthy@ucl.ac.uk"
	  }
	];
	return {
		get: function() {
			return staff;
		},

		find: function(staffID) {
			index = staff.findIndex( function(x) {
				return x.staffID === staffID;
			});
			return staff[index];
		}
	};
});
