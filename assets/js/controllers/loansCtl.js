var deviceMgr = angular.module('deviceMgr');

//LOANS CONTROLLER
deviceMgr.controller('loansCtl', function($scope, $rootScope,
	$timeout, $filter, loans, clients, devices, types,
	categories) {

	//get data and store locally
	var getData = function() {
		devices.get().$promise.then(function(devicesData) {

			types.get().$promise.then(function(typesData) {

				categories.get().$promise.then(function(categoriesData) {

					clients.get().$promise.then(function(clientsData) {

						loans.get().$promise.then(function(loansData) {

							//assign data from get requests to local copy
							$scope.devices = devicesData;
							$scope.types = typesData;
							$scope.categories = categoriesData;
							$scope.clients = clientsData;
							$scope.loans = loansData;

							//find functions
							//clients
							$scope.clients.find = function(clientID) {
								var c = $scope.clients.filter(function(client) {
									return client.clientID === clientID;
								});
								return c[0];
							};
							//devices
							$scope.devices.find = function(deviceID) {
								var d = $scope.devices.filter(function(device) {
									return device.deviceID === deviceID;
								});
								return d[0];
							};
							//devices
							$scope.loans.find = function(loanID) {
								var l = $scope.loans.filter(function(loan) {
									return loan.loanID === loanID;
								});
								return l[0];
							};
							//types
							$scope.types.find = function(typeID) {
								var t = $scope.types.filter(function(type) {
									return type.typeID === typeID;
								});
								return t[0];
							};
							//categories
							$scope.categories.find = function(categoryID) {
								var c = $scope.categories.filter(function(category) {
									return category.categoryID === categoryID;
								});
								return c[0];
							};

							//add info about client and device to each request object
							$scope.loans.forEach(function(loan) {
								var client = $scope.clients.find(loan.clientID);
								var device = $scope.devices.find(loan.deviceID);
								var type = $scope.types.find(device.typeID);
								var subCategory = $scope.categories.find(type.categoryID);
								var parentCategory = $scope.categories.find(subCategory.parentCategoryID);

								loan.clientFirstName = client.clientFirstName;
								loan.clientLastName = client.clientLastName;
								loan.clientType = client.clientType;
								loan.clientEmail = client.clientEmail;
								loan.clientStudentNo = client.clientStudentNo;

								loan.availableFrom = device.availableFrom;
								loan.typeName = type.typeName;
								loan.subCategoryName = subCategory.categoryName;
								loan.parentCategoryName = parentCategory.categoryName;
								loan.deviceID = device.deviceID;
								loan.deviceSerial = device.serial;
								loan.deviceDescription = device.description;
								loan.deviceNotes = device.notes;
								loan.defaultLoanTime = device.defaultLoanTime;

								//for filterring current and overdue loans
								if (loan.dateStarted && (loan.returned === null)) {
									var today = new Date();
									loan.current = true;
									if (today > Date.parse(loan.due)) {
										loan.overdue = true;
										loan.overdueDays =
											today - Date.parse(loan.due) -
												1000*60*60*24;
									} else {
										loan.dueInDays =
											Date.parse(loan.due) - today;
									}
								}
							});

						}); //end of loans.get() function

					}); //end of clients.get() function

				}); //end of categories.get() function

			}); //end of types.get() function

		}); //end of devices.get() function

	};

	//get data when page loads
	getData();

	//REQUESTS

	//deny request function
	$scope.deny = function(requestID, emailMessage) {
		loans.find(requestID).$promise.then(function(loan) {
			loan.approved = false;

			//save changes on server
			loan.$update();

			//send email
			clients.find(loan.clientID).$promise.then(function(client) {
				$rootScope.sendEmail(client.clientEmail,
				'Loan request denied', emailMessage);
			});

			//update local data model
			getData();
			//update badge in navbar
			$rootScope.updateNav();
		});

	};

	//approve request function
	$scope.approve = function(requestID, radio, selectedDate, emailMessage) {

		loans.find(requestID).$promise.then(function(loan) {

			loan.approved = true;

			//set due date for loan
			var due;

			switch (radio) {

				case "default":
				var defaultDate
					= $scope.defaultReturn($scope.loans.find(requestID));
				due = $filter('date')(defaultDate, "yyyy-MM-dd");
				break;

				case "requested":
				var requestedDate
					= $scope.loans.find(requestID).length;
				due = $filter('date')(requestedDate, "yyyy-MM-dd");
				break;

				case "other":
				if (selectedDate) {
					due = selectedDate.getFullYear() +
					"-" + (selectedDate.getMonth() + 1) +
					"-" + selectedDate.getDate();
				} else {
					return;
				}
				break;
			}
			loan.due = due;
			loan.staffID = $rootScope.currentUser.staffID;

			//update loan on server
			loan.$update();

			//set device availableFrom
			devices.find(loan.deviceID).$promise.then(function(device){
				device.availableFrom = due;
				device.$update();
			});

			//send email
			clients.find(loan.clientID).$promise.then(function(client) {
				$rootScope.sendEmail(client.clientEmail,
				'Loan request approved', emailMessage);
			});

			//update local data model
			getData();

			//update badge in navbar
			$rootScope.updateNav();
		});


	};

	//calculate todays date + default loan time
	$scope.defaultReturn = function(loan) {
		var d = new Date();
		return d.setDate(d.getDate() + loan.defaultLoanTime);
	};

	//function to return soonest available date for return request date
	$scope.parseDate = function(date) {
		var d = new Date();
		return date ? Date.parse(date) : d.toString();
	};

	//set default radio button active for modals
	$scope.radio = "default";

	//set message to send to client
	$scope.getConfirmMessage = function(loan, radio, selectedDate) {
		var message = "";
		message =
		"Dear " + loan.clientFirstName + "\n\n" +
		"Your loan request for " + loan.typeName +
		" has been approved.\n\n";
		if (loan.due) {
			message += "It may be collected on: " +
			loan.due + "\n\n";
		} else {
			message += "It is ready for collection now.\n\n";
		}

		var due;

		switch (radio) {

			case "default":
			var defaultDate
				= $scope.defaultReturn(loan);
			due =  $filter('date')(defaultDate, "dd/MM/yyyy");
			break;

			case "requested":
			var requestedDate
				= loan.length;
			due = $filter('date')(requestedDate, "dd/MM/yyyy");
			break;

			case "other":
			if (selectedDate) {
				due = selectedDate.getDate() +
				"/" + (selectedDate.getMonth() + 1) +
				"/" + selectedDate.getFullYear();
			} else {
				return;
			}
			break;
		}

		message += "The device must be return by: " + due;

		return message;
	};

	//SIGN OUT
	$scope.signOutConfirm = function(loanID) {

		loans.find(loanID).$promise.then(function(loan) {

			var date = new Date();
			loan.dateStarted = $filter('date')(date, "yyyy-MM-dd");

			//send changes to server
			loan.$update();

			//update local data model
			getData();

			//update badge in navbar
			$rootScope.updateNav();

		});	//end loans.find()

	};

	$scope.cancelRequest = function(loanID, emailMessage) {

		loans.get().$promise.then(function(allLoans) {
			loans.find(loanID).$promise.then(function(thisLoan) {
				devices.find(thisLoan.deviceID).$promise.then(function(device) {

					var deviceHasOtherLoans = false;
					var date = new Date();

					allLoans.forEach(function (loan) {
						if (loan.deviceID === thisLoan.deviceID &&
							loan.loanID != thisLoan.loanID) {

							if (Date.parse(device.availableFrom) >
								Date.parse(date)) {
								date = loan.due;
								deviceHasOtherLoans = true;
								device.availableFrom = loan.due;
								device.$update();
							}
						}
					});

					if (!deviceHasOtherLoans) {
						device.availableFrom = null;
						device.$update();
					}

					thisLoan.due = null;
					thisLoan.approved = false;

					thisLoan.$update();

					//send email
					clients.find(thisLoan.clientID).$promise.then(function(client) {
						$rootScope.sendEmail(client.clientEmail,
						'Loan request cancelled', emailMessage);
					});

					//update local data model
					getData();

					//update badge in navbar
					$rootScope.updateNav();

				});	//end devices.find()

			});	//end loans.find()

		});	//end loans.get()

	};	//end cancelRequest function


	//SIGN IN
	$scope.signInConfirm = function(loanID) {

		loans.get().$promise.then(function(allLoans) {
			loans.find(loanID).$promise.then(function(thisLoan) {
				devices.find(thisLoan.deviceID).$promise.then(function(device) {

					var deviceHasOtherLoans = false;
					var date = new Date();

					allLoans.forEach(function (loan) {
						if (loan.deviceID === thisLoan.deviceID &&
							loan.loanID != thisLoan.loanID) {

							if (Date.parse(device.availableFrom) >
								Date.parse(date)) {
								date = loan.due;
								deviceHasOtherLoans = true;
								device.availableFrom = loan.due;
								device.$update();
							}
						}
					});

					if (!deviceHasOtherLoans) {
						device.availableFrom = null;
						device.$update();
					}

					//set loan return date to current date
					thisLoan.returned = $filter('date')(new Date(), "yyyy-MM-dd");

					thisLoan.$update();
					//update local data model
					getData();

					//update badge in navbar
					$rootScope.updateNav();

				});	//end devices.find()

			});	//end loans.find()

		});	//end loans.get()

	};	//end sign in loan function

	//function for sending a notification
	$scope.sendNotification = function(clientEmail, emailMessage) {
		$rootScope.sendEmail(clientEmail, 'Notification', emailMessage);
	};

})	//end of controller

//filter for rounding up no. of days
.filter('roundup', function () {
	return function (value) {
		return Math.ceil(value);
	};
});
