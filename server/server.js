var express = require("express");
var cors = require("cors");
var bodyParser = require ("body-parser");
var app = express();

var devices = require("./data/devices.json");

var clients = require("./data/clients.json");

var category = require("./data/category.json");

var loan = require("./data/loan.json");

var type = require("./data/type.json");

var staff = require("./data/staff.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' -${JSON.stringify(req.body) }`);
	next();
});

app.use(express.static("../"));

app.use(cors());

app.get("/api/devices", function(req, res) {
	if (req.query.deviceID) {
		//device us specified
		var d = devices.filter(function(device){
			  return device.deviceID === parseInt(req.query.deviceID);
	    });
		res.json(d[0]);
	} else {
		//no device specified - return array of all devices
		res.json(devices);
	}
});

app.get("/api/clients", function(req, res) {
	res.json(clients);
});

app.get("/api/loan", function(req, res) {
	res.json(loan);
});

app.get("/api/category", function(req, res) {
	res.json(category);
});

app.get("/api/staff", function(req, res) {
	res.json(staff);
});

app.get("/api/type", function(req, res) {
	res.json(type);
});

app.post("/api/clients", function(req, res){
  clients.push(req.body);
  res.json(clients);
});

app.post("/api/devices", function(req, res){
  devices.push(req.body);
  res.json(devices);
});

app.post("/api/loan", function(req, res){
  loan.push(req.body);
  res.json(loan);
});

app.post("api/category", function(req, res){
  category.push(req.body);
  res.json(category);
});

app.post("/api/type", function(req, res){
  type.push(req.body);
  res.json(type);
});

app.post("/api/staff", function(req, res){
  staff.push(req.body);
  res.json(staff);
});



app.get("/api/category/:id", function(req, res){

  res.json(category.filter(function(id){
		  return id.term.toLowerCase() === req.params.term.toLowerCase();
    })
  );
});

app.get("/api/clients/:id", function(req, res){

  res.json(category.filter(function(id){
		  return id.term.toLowerCase() === req.params.term.toLowerCase();
    })
  );
});

app.get("/api/loan/:id", function(req, res){

  res.json(category.filter(function(id){
		  return id.term.toLowerCase() === req.params.term.toLowerCase();
    })
  );
});

app.get("/api/staff/:id", function(req, res){

  res.json(category.filter(function(id){
		  return id.term.toLowerCase() === req.params.term.toLowerCase();
    })
  );
});

app.get("/api/devices/:id", function(req, res){

  res.json(devices.filter(function(device){
		  return device.deviceID === parseInt(req.params.id);
    })
  );
});

app.get("/api/type/:id", function(req, res){

  res.json(type.filter(function(id){
		  return id.term.toLowerCase() === req.params.term.toLowerCase();
    })
  );
});


app.delete("/api/category/:id", function(req, res){
  category = category.filter(function(categoryID){
     return categoryID.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  res.json(category);
});

app.delete("/api/devices/:id", function(req, res){
  devices = devices.filter(function(deviceID){
     return deviceID.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  res.json(devices);
});

app.delete("/api/loan/:id", function(req, res){
  loan = loan.filter(function(loanID){
     return loanID.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  res.json(loan);
});

app.delete("/api/staff/:id", function(req, res){
  staff = staff.filter(function(staffID){
     return staffID.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  res.json(staff);
});

app.delete("/api/type/:id", function(req, res){
  type = type.filter(function(typeID){
     return typeID.term.toLowerCase() !== req.params.term.toLowerCase();
  });
  res.json(type);
});

app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile('index.html', { root: '../' });
});

app.listen(80);

console.log("Express app running on port 80");

module.exports = app;
