var deviceMgr = angular.module('deviceMgr');

	//CLIENT PROFILE CONTROLLER
	deviceMgr.controller('clientProfileCtl', function($scope,
		$rootScope, $routeParams, $filter, clients, loans, types,
		devices) {

	//get client
	var getData = function() {
		clients.find(parseInt($routeParams.id)).$promise.then(function(client) {
			$scope.activeClient = client;

			//for sending notifications - to reuse previous modal
			$scope.loan = {};
			$scope.loan.clientEmail = client.clientEmail;

			//get loan history for the client
			loans.get().$promise.then(function(loans) {
				$scope.loans = loans.filter(function(loan) {
					return loan.clientID === client.clientID;
				});

				//add extra info to each loan object
				$scope.loans.forEach(function(loan) {
					devices.find(loan.deviceID).$promise.then(function(device) {
						types.find(device.typeID).$promise.then(function(type) {
							loan.typeName = type.typeName;
						});
					});

					//add current loan status to each loan in history
					var days;
					if (loan.approved === null) {
						loan.loanStatus = "Pending approval";
					} else if (loan.approved === false) {
						loan.loanStatus = "Request denied";
					} else if (loan.approved === true) {
						if (loan.dateStarted === null) {
							loan.loanStatus = "Awaiting collection";
						} else if (loan.dateStarted) {
							if (loan.returned) {
								if (Date.parse(loan.returned) > Date.parse(loan.due)) {
									days = Date.parse(loan.returned) - Date.parse(loan.due);
									loan.loanStatus = "Returned " +
									(days / 86400000) + " days late";
								} else {
									loan.loanStatus = "Returned on time";
								}
							} else {
								if (new Date() > Date.parse(loan.due)) {
									days = new Date() - Date.parse(loan.due) - 1000*60*60*24;
									loan.loanStatus = "Signed out - overdue " +
									Math.ceil(days / 86400000) + " days";
								} else {
									loan.loanStatus = "Signed out - due: " +
									$filter('date')(loan.due, "dd/MM/yyyy");
								}
							}
						}
					}
				});	//end $scope.loans.forEach()

			});	//end loans.get()

		});	//end clients.find()

	};	//end getData()

	//run function to get data from server
	getData();

	//function for switching in and out of edit mode
	$scope.edit = function (value) {
	$scope.editable = value;
	};

	//function for updating the client details on the server
	$scope.update = function(activeClient) {
		activeClient.$update();
		//update local data model
		getData();
	};

	//function for sending email
	$scope.sendNotification = function(emailAddress, emailMessage) {
		$rootScope.sendEmail(emailAddress, 'Notification', emailMessage);
	};

});
