var express = require("express");
var cors = require("cors");
var bodyParser = require ("body-parser");
var nodemailer = require('nodemailer');

var app = express();

var devices = require("./data/devices.json");

var clients = require("./data/clients.json");

var categories = require("./data/category.json");

var loans = require("./data/loan.json");

var types = require("./data/type.json");

var staff = require("./data/staff.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use(function(req, res, next) {
	console.log(req.method + " request for " + req.url + " - " + JSON.stringify(req.body));
	next();
});

app.use(express.static("../"));

app.use(cors());


/* EMAIL */
var router = express.Router();
app.use('/sendEmail', router);
router.post('/', handleSendEmail);

function handleSendEmail(req, res) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'loanstsg@gmail.com',
			pass: 'loanpass'
		}
	});

	console.log(JSON.stringify(req.body));

	var mailOptions = {
		from: 'loanstsg@gmail.com',
		to: req.body.address,
		subject: req.body.subject,
		text: req.body.message
	};

	transporter.sendMail (mailOptions, function(error, info) {
		if (error) {
			console.log(error);
			res.json({resMessage: '' + error});
		} else {
			console.log('Message sent: ' + info.response);
			res.json({resMessage: 'Message sent.'});
		}
	});
}


/* CATEGORIES API */
app.delete("/api/categories", function(req, res){
  categories = categories.filter(function(category){
     return category.categoryID !== parseInt(req.query.categoryID);
  });
	//send confirmation
	res.sendStatus(200);
});

app.get("/api/categories", function(req, res) {
	if (req.query.categoryID) {
		//category is specified - return single category
		var c = categories.filter(function(category){
			  return category.categoryID === parseInt(req.query.categoryID);
	    });
		res.json(c[0]);
	} else {
		//no category specified - return array of all categories
		res.json(categories);
	}
});

app.post("/api/categories", function(req, res){
	var category = req.body;
	category.categoryID = categories.length;
  categories.push(category);
	//send confirmation
	res.sendStatus(200);
});

app.put("/api/categories", function(req, res){
	//get matching category by categoryID
	var c = categories.filter(function(category){
			return category.categoryID === parseInt(req.body.categoryID);
	});
	c[0] = Object.assign(c[0], req.body);
	//send confirmation
	res.sendStatus(200);
});


/* CLIENTS API */
app.delete("/api/clients", function(req, res) {
	clients = clients.filter(function(client) {
		return client.clientID !== parseInt(req.query.clientID);
	});
	//send confirmation
	res.sendStatus(200);
});

app.get("/api/clients", function(req, res) {
	if (req.query.clientID) {
		//client is specified - return single client
		var c = clients.filter(function(client) {
			return client.clientID === parseInt(req.query.clientID);
		});
		res.json(c[0]);
	} else {
		//no client specified - return array of all categories
		res.json(clients);
	}
});

app.post("/api/clients", function(req, res){
	var client = req.body;
	client.clientID = clients.length;
  clients.push(client);
	//send confirmation
	var i = 0;
	clients.forEach(function(client) {
		console.log (i + ": -- : ");
		console.log(JSON.stringify(client));
		i++;
	});
  res.json(client);
});

app.put("/api/clients", function(req, res) {
	//get matching client by clientID
	var c = clients.filter(function(client) {
		return client.clientID === parseInt(req.body.categoryID);
	});
	c[0] = Object.assign(c[0], req.body);
	//send confirmation
	res.sendStatus(200);
});


/*-- DEVICES API --*/
app.delete("/api/devices", function(req, res){
  devices = devices.filter(function(device){
     return device.deviceID !== parseInt(req.query.deviceID);
  });
	//send confirmation
	res.sendStatus(200);
});

app.get("/api/devices", function(req, res) {
	if (req.query.deviceID) {
		//device is specified - return single device
		var d = devices.filter(function(device){
			  return device.deviceID === parseInt(req.query.deviceID);
	    });
		res.json(d[0]);
	} else {
		//no device specified - return array of all devices
		res.json(devices);
	}
});

app.post("/api/devices", function(req, res){
	//console.log(req.body);
	var device = req.body;
	device.deviceID = devices.length;
  devices.push(device);
	//send confirmation
	res.sendStatus(200);
});

app.put("/api/devices", function(req, res){
	//get matching device by deviceID
	var d = devices.filter(function(device){
			return device.deviceID === parseInt(req.body.deviceID);
	});
	d[0] = Object.assign(d[0], req.body);
	//send confirmation
	res.sendStatus(200);
});


/* LOANS API */
app.delete("/api/loans", function(req, res){
  loans = loans.filter(function(loan){
     return loan.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  //send confirmation
	res.sendStatus(200);
});

app.get("/api/loans", function(req, res) {
	if (req.query.loanID) {
		//loan is specified - return single loan
		var l = loans.filter(function(loan) {
			return loan.loanID === parseInt(req.query.loanID);
		});
		res.json(l[0]);
	} else {
		//no loan specified - return array of all categories
		res.json(loans);
	}
});

app.post("/api/loans", function(req, res){
	var loan = req.body;
	loan.loanID = loans.length;
	loans.push(loan);
  //send confirmation
	res.sendStatus(200);
});

app.put("/api/loans", function(req, res) {
	//get matching loan by loanID
	var l = loans.filter(function(loan) {
		return loan.loanID === parseInt(req.body.loanID);
	});
	l[0] = Object.assign(l[0], req.body);
	//send confirmation
	res.sendStatus(200);
});


/* STAFF API */
app.delete("/api/staff", function(req, res){
  staff = staff.filter(function(staffID){
     return staffID.term.toLowerCase() !== parseInt(req.query.staffID);
  });
  //send confirmation
	res.sendStatus(200);
});

app.get("/api/staff", function(req, res) {
	if (req.query.staffID) {
		//staff is specified - return single staff member
		var s = staff.filter(function(staffMember) {
			return staffMember.staffID === parseInt(req.query.staffID);
		});
		res.json(s[0]);
	} else {
		//no staff member specified - return array of all staff
		res.json(staff);
	}
});

app.post("/api/staff", function(req, res){
  var staffMember = req.body;
	staffMember.staffID = staff.length;
	staff.push(staffMember);
	//send confirmation
	res.sendStatus(200);
});

app.put("/api/staff", function(req, res) {
	//get matching staff member by staffID
	var s = staff.filter(function(staffMember) {
		return staffMember.staffID === parseInt(req.body.staffID);
	});
	s[0] = Object.assign(s[0], req.body);
	//send confirmation
	res.sendStatus(200);
});


/* TYPES API */
app.delete("/api/types", function(req, res){
  type = types.filter(function(typeID){
     return typeID.typeID !== parseInt(req.query.typeID);
  });
	//send confirmation
	res.sendStatus(200);
});

app.get("/api/types", function(req, res) {
	if (req.query.typeID) {
		//type is specified - return single type
		var t = types.filter(function(type){
			return type.typeID === parseInt(req.query.typeID);
		});
		res.json(t[0]);
	} else {
		//no type specified - return array of all types
		res.json(types);
	}
});


app.post("/api/types", function(req, res){
	//console.log(req.body);
	var type = req.body;
	type.typeID = types.length;
  types.push(type);
	//send confirmation
	res.sendStatus(200);
});

app.put("/api/types", function(req, res){
	//get matching type by deviceID
	var t = types.filter(function(type){
			return type.typeID === parseInt(req.body.typeID);
	});
	t[0] = Object.assign(t[0], req.body);
	//send confirmation
	res.sendStatus(200);
});


//for error page redirecting if any details page is requested
app.get("/clientDeviceDetails/:id", function(req, res){
  res.sendFile('/clientError.html', { root: '../' });
});

app.get("/clientProfile/:id", function(req, res){
  res.sendFile('/error.html', { root: '../' });
});

app.get("/deviceDetails/:id", function(req, res){
  res.sendFile('/error.html', { root: '../' });
});

//handle refreshing of all other pages
app.use(function(req, res) {
  res.sendFile('/', { root: '../' });
});

app.listen(3002);

console.log("Express app running on port 3002");

module.exports = app;
