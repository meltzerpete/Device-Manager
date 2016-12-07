var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('clients', function devicesFactory(){
	var clients = [
		{
	    clientID : 0,
	    clientFirstName : "John",
	    clientLastName : "Stokes",
	    clientCourse: null,
	    clientSupervisor: null,
	    clientType:"UCL Staff",
	    clientStudentNo: null,
	    clientEmail:"john.stokes@ucl.ac.uk"
	  },
	  {
	    clientID : 1,
	    clientFirstName : "Sue",
	    clientLastName : "Dayly",
	    clientCourse:"MSc CS",
	    clientSupervisor:"Jo Hubbs",
	    clientType:"UCL Postgraduate",
	    clientStudentNo: 16092222,
	    clientEmail:"sue.dayly@ucl.ac.uk"
	  },
	  {
	    clientID : 2,
	    clientFirstName : "Arthur",
	    clientLastName : "Wang",
	    clientCourse: null,
	    clientSupervisor: null,
	    clientType:"External",
	    clientStudentNo: null,
	    clientEmail:"arthurwang@hotmail.com"
	  },
	  {
	    clientID : 3,
	    clientFirstName : "John",
	    clientLastName : "Lally",
	    clientCourse: "BSc Systems Engineering",
	    clientSupervisor: null,
	    clientType:"UCL Undergraduate",
	    clientStudentNo: 24528878,
	    clientEmail:"john.lally@ucl.ac.uk"
	  },
	  {
	    clientID : 4,
	    clientFirstName : "Lauren",
	    clientLastName : "Wright",
	    clientCourse: "MSc CS",
	    clientSupervisor: null,
	    clientType:"UCL Postgraduate",
	    clientStudentNo: 129899,
	    clientEmail:"lauren.wright@ucl.ac.uk"
	  }
	];
	return {
		add: function(client) {
			client.clientID = clients.length;
			clients.push(client);
		},

		get: function() {
			return clients;
		},

		find: function(clientID) {
			index = clients.findIndex( function(x) {
				return x.clientID === clientID;
			});
			return clients[index];
		}
	};
});
