var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('clients', function devicesFactory(){
	var clients = [
		{
	    clientID : 0,
	    clientFistName : "lizhi",
	    clientLastName : "Lu",
	    clientCourse: null,
	    clientSupervisor: null,
	    clientType:"UCL Staff",
	    clientStudentNo: null,
	    clientEmail:"lizhilu@ucl.ac.uk"
	  },
	  {
	    clientID : 1,
	    clientFistName : "Peter",
	    clientLastName : "Melzer",
	    clientCourse:"MSc CS",
	    clientSupervisor:"Jo Hubbs",
	    clientType:"UCL Postgraduate",
	    clientStudentNo: 16092222,
	    clientEmail:"melzzer.peter@ucl.ac.uk"
	  },
	  {
	    clientID : 2,
	    clientFistName : "Zhenning",
	    clientLastName : "Lou",
	    clientCourse: null,
	    clientSupervisor: null,
	    clientType:"External",
	    clientStudentNo: null,
	    clientEmail:"zhenninglou@homtail.com"
	  }
	];
	return {
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
