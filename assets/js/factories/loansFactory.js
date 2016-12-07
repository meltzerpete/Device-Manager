var deviceMgr = angular.module('deviceMgr');

deviceMgr.factory('loans', function devicesFactory(){
	var loans = [
		{
	    loanID : 0,
	    due : "2016-12-15",
	    dateStarted : "2016-09-09",
	    extensionRequested: false,
	    returned: null,
	    onTheFly: false,
	    damageReported: null,
	    approved: true,
	    length: "2016-12-15",
	    deviceID: 1,
	    clientID: 0,
	    staffID: 0
	  },
	  {
	    loanID : 1,
	    due : null,
	    dateStarted : null,
	    extensionRequested: null,
	    returned: null,
	    onTheFly: false,
	    damageReported: null,
	    approved: null,
	    length: "2017-02-10",
	    deviceID: 0,
	    clientID: 1,
	    staffID: null
	  },
	  {
	    loanID : 2,
	    due : "2016-12-01",
	    dateStarted : "2016-09-09",
	    extensionRequested: false,
	    returned: "2016-11-25",
	    onTheFly: false,
	    damageReported: "cracked screen",
	    approved: true,
	    length: "2016-11-10",
	    deviceID: 4,
	    clientID: 0,
	    staffID: 1
	  },
	  {
	    loanID : 3,
	    due : null,
	    dateStarted : null,
	    extensionRequested: false,
	    returned: null,
	    onTheFly: false,
	    damageReported: null,
	    approved: null,
	    length: "2017-01-01",
	    deviceID: 2,
	    clientID: 3,
	    staffID: null
	  },
	  {
	    loanID : 4,
	    due : "2016-12-03",
	    dateStarted : "2016-09-01",
	    extensionRequested: false,
	    returned: null,
	    onTheFly: false,
	    damageReported: null,
	    approved: true,
	    length: "2016-12-14",
	    deviceID: 3,
	    clientID: 4,
	    staffID: 0
	  },
	  {
	    loanID : 5,
	    due : "2016-12-03",
	    dateStarted : null,
	    extensionRequested: false,
	    returned: null,
	    onTheFly: false,
	    damageReported: null,
	    approved: true,
	    length: "2017-01-15",
	    deviceID: 2,
	    clientID: 1,
	    staffID: null
	  }
	];
	return {
		add: function(loan) {
			loan.loanID = loans.length;
			loans.push(loan);
		},

		get: function() {
			return loans;
		},

		getRequestsNo: function() {

			var requests = [];

			loans.forEach(function(loan) {
				if (loan.approved === null) {
					requests.push(loan);
				}
			});

			return requests.length;
		},

		getApprovedNo: function() {

			var approved = [];

			loans.forEach(function(loan) {
				if (loan.approved === true && loan.dateStarted === null) {
					approved.push(loan);
				}
			});

			return approved.length;
		},

		getCurrentNo: function() {

			var current = [];

			loans.forEach(function(loan) {
				if (loan.dateStarted && loan.returned === null) {
					current.push(loan);
				}
			});

			return current.length;
		},

		find: function(loanID) {
			index = loans.findIndex( function(x) {
				return x.loanID === loanID;
			});
			return loans[index];
		}
	};
});
