var express = require("express");
var cors = require("cors");
var bodyParser = require ("body-parser");
var app = express();

var devices = require("./data/devices.json");

var clients = require("./data/clients.json");

var categories = require("./data/category.json");

var loan = require("./data/loan.json");

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
app.get("/api/clients", function(req, res) {
	res.json(clients);
});

app.post("/api/clients", function(req, res){
  clients.push(req.body);
  res.json(clients);
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
app.delete("/api/loan/:id", function(req, res){
  loan = loan.filter(function(loanID){
     return loanID.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  res.json(loan);
});

app.get("/api/loan", function(req, res) {
	res.json(loan);
});

app.post("/api/loan", function(req, res){
  loan.push(req.body);
  res.json(loan);
});


/* STAFF API */
app.delete("/api/staff/:id", function(req, res){
  staff = staff.filter(function(staffID){
     return staffID.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  res.json(staff);
});

app.get("/api/staff", function(req, res) {
	res.json(staff);
});

app.post("/api/staff", function(req, res){
  staff.push(req.body);
  res.json(staff);
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

app.listen(80);

console.log("Express app running on port 80");

module.exports = app;
