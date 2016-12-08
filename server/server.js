var express = require("express");
var cors = require("cors");
var app = express();

var devices = require("./data/devices.json");

var clients = require("./data/clients.json");

var category = require("./data/category.json");

var loan = require("./data/loan.json");

var type = require("./data/type.json");

var staff = require("./data/staff.json");

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.use(express.static("../"));

app.use(cors());

app.get("/api/devices", function(req, res) {
	res.json(devices);
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

app.listen(80);

console.log("Express app running on port 80");

module.exports = app;
