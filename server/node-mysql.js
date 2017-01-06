var mysql = require ('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'password',
  database: 'loans',
  port: '8889',
  connectionLimit:50
});

connection.connect();

var express = require("express");
var cors = require("cors");
var bodyParser = require ("body-parser");
var nodemailer = require('nodemailer');

var app = express();


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
  //database
   connection.query('DELETE from category where category_id =?',
   [parseInt(req.query.categoryID)],function(err,result,fields){
  //   connection.end();
     if (err) throw err;

    });
	//send confirmation
	res.sendStatus(200);
});

app.get("/api/categories", function(req, res) {

  if (req.query.categoryID){
     connection.query('SELECT category_id AS categoryID, category_name AS categoryName, category_parentid AS parentCategoryID FROM category where category_id = ?',
   [parseInt(req.query.categoryID)],function(err,row){
    //   connection.end();
       if (err)  throw err;
       res.json(row[0]);
   });
 }  else {
    connection.query('SELECT category_id AS categoryID, category_name AS categoryName, category_parentid AS parentCategoryID FROM category ',
  function(err,row){
  //  connection.end();
    if (err)  throw err;
    res.json(row);
  });
 }

 });


app.post("/api/categories", function(req, res){
  var category = req.body;

  connection.query('INSERT INTO category(category_name, category_parentid) VALUES (?,?)',
[category.categoryName,category.parentCategoryID],function(err,row){
  if (err) throw err;

})
	//send confirmation
	res.sendStatus(200);
})

app.put("/api/categories", function(req,res){
 var category = req.body;
  connection.query('UPDATE category SET category_name=?, category_parentid=? WHERE category?',
[category.categoryName,category.parentCategoryID, category_id = req.body.categoryID],
function (err,row){
 if (err) throw err;
 console.log(req.body);
})
})


app.delete("/api/clients", function(req, res){
  //database
   connection.query('DELETE from client where client_id =?',
   [parseInt(req.query.clientID)],function(err,result,fields){
  //   connection.end();
     if (err) throw err;

    });
	//send confirmation
	res.sendStatus(200);
});

 app.get("/api/clients", function(req, res) {
 	if (req.query.clientID) {
 		//client is specified - return single client

    connection.query('SELECT client_id AS clientID, client_firstname AS clientFirstName, client_lastname AS clientLastName, ' +
    'client_course AS clientCourse, client_supervisor AS clientSupervisor, client_type AS clientType, client_studentno AS clientStudentNo, client_email AS clientEmail  FROM client WHERE client_id =?',
  [parseInt(req.query.clientID)],function(err,row){
  //  connection.end();
    if (err)  throw err;
    res.json(row[0]);
    console.log(JSON.stringify(row));
  });
 	} else {
 		//no client specified - return array of all categories
    connection.query('SELECT client_id AS clientID, client_firstname AS clientFirstName, client_lastname AS client_lastname, ' +
    'client_course AS clientCourse, client_supervisor AS clientSupervisor, client_type AS clientType, client_studentno AS clientStudentNo, client_email AS clientEmail  FROM client',
    function(err,row){
    //  connection.end();
      if (err) throw err;
      res.json(row);
    });
 	}
 })

 app.post("/api/clients", function(req, res){
  var clients = req.body;
  connection.query('INSERT INTO client(client_email, client_firstname, client_lastname, client_course, client_type, client_studentno, client_supervisor) VALUES(?,?,?,?,?,?,?)'),
  [clients.clientEmail,clients.clientFirstName,clients.clientLastName,clients.clientCourse,clients.clientType,clients.clientStudentNo,clients.clientSupervisor],function(err,row){
    if (err) throw err;
  }
 })

 app.put("/api/clients", function(req,res){
  var clients = req.body;
   connection.query('UPDATE client SET client_email=?, client_firstname=?, client_lastname=?, client_course=?, client_type=?, client_studentno=?, client_supervisor=? WHERE ?',
 [clients.clientEmail,clients.clientFirstName,clients.clientLastName,clients.clientCourse,clients.clientType,clients.clientStudentNo,clients.clientSupervisor, client_id = clients.clientID],
function (err,row){
  if (err) throw err;
  console.log(req.body);
  })
 })

 app.delete("/api/devices", function(req, res){
   //database
    connection.query('DELETE from device where device =?',
    [parseInt(req.query.deviceID)],function(err,result,fields){
   //   connection.end();
      if (err) throw err;

     });
 	//send confirmation
 	res.sendStatus(200);
 });

 app.get("/api/devices", function(req, res){
   if (req.query.deviceID){
     connection.query('SELECT device_id AS deviceID, device_description AS description, device_availablefrom AS availableFrom, device_dateofpurchase AS dateOfPurchase, device_dateoutofservice AS dateOutOfService, device_defaultloantime AS defaultLoanTime, device_isworking AS isWorking, device_notes AS notes, device_serial AS serial, device_visible AS visible, type_id AS typeID FROM device WHERE device_id=?',
   [parseInt(req.query.deviceID)],function(err,row){
  //   connection.end();
     if (err) throw err;
     row.forEach(function(item){
       item.isWorking = !!+item.isWorking;
       item.visible = !!+item.visible;
     });
     res.json(row[0]);
     console.log(JSON.stringify(row[0]));
   });
   } else  {
     connection.query('SELECT device_id AS deviceID, device_description AS description, device_availablefrom AS availableFrom, device_dateofpurchase AS dateOfPurchase, device_dateoutofservice AS dateOutOfService, device_defaultloantime AS defaultLoanTime, device_isworking AS isWorking, device_notes AS notes, device_serial AS serial, device_visible AS visible, type_id AS typeID FROM device',
        function (err,row){
        //  connection.end();
          if (err) throw err;
          row.forEach(function(item){
            item.isWorking = !!+item.isWorking;
            item.visible = !!+item.visible;
          });
          res.json(row);
        });
   }
 })

 app.post("/api/devices", function(req, res){
   var devices = req.body;
   connection.query('INSERT INTO device(device_availablefrom, device_dateofpurchase, device_dateoutofservice, device_defaultloantime, device_description, device_isworking, device_notes, device_serial, device_visible, type_id) VALUES (?,?,?,?,?,?,?,?,?,?)',
   [devices.availableFrom,devices.dateOfPurchase,devices.dateOutOfService,devices.defaultLoanTime,devices.description,devices.isWorking,devices.notes,devices.serial,devices.visible,devices.typeID],
   function (err,row){
     if (err) throw err;
   })
 })

 app.put("/api/devices", function(req, res){
    var devices = req.body;
   connection.query("UPDATE device SET device_availablefrom =?, device_dateofpurchase=?, device_dateoutofservice=?, device_defaultloantime=?, device_description=?, device_isworking=?, device_notes=?, device_serial=?, device_visible=?, type_id=? WHERE device_id =?",
 [devices.availableFrom,devices.dateOfPurchase,devices.dateOutOfService,devices.defaultLoanTime,devices.description,devices.isWorking,devices.notes,devices.serial,devices.visible,devices.typeID,parseInt(req.body.deviceID)],
function (err,row){
  if (err) throw err;
  console.log(req.body);
})
 })

 app.delete("/api/loans", function(req, res){
   //database
    connection.query('DELETE from loan where loan_id =?',
    [parseInt(req.query.loanID)],function(err,result,fields){
   //   connection.end();
      if (err) throw err;

     });
 	//send confirmation
 	res.sendStatus(200);
 });

 app.get("/api/loans",function(req,res){
   if (req.query.loanID){
     connection.query('SELECT loan_id AS loanID, loan_due AS due, loan_datestarted AS dateStarted, loan_extensionrequested AS extensionRequested, loan_returned AS returned, loan_onthefly AS onTheFly, loan_damagereported AS damageReported, loan_approved AS approved, loan_length AS length, device_id AS deviceID, client_id AS clientID, signout_staff_id AS staffID FROM loan WHERE loan_id=?',
   [parseInt(req.query.loanID)],function(err,row){
     //connection.end();
     if (err) throw err;
     row.forEach(function(item) {
       item.approved = !!+item.approved;
       item.onTheFly = !!+item.onTheFly;
     });
     res.json(row[0]);
   });
 } else{
     connection.query('SELECT loan_id AS loanID, loan_due AS due, loan_datestarted AS dateStarted, loan_extensionrequested AS extensionRequested, loan_returned AS returned, loan_onthefly AS onTheFly, loan_damagereported AS damageReported, loan_approved AS approved, loan_length AS length, device_id AS deviceID, client_id AS clientID, signout_staff_id AS staffID FROM loan',
       function (err,row){
          if (err) throw err;

          row.forEach(function(item) {
            item.approved = !!+item.approved;
            item.onTheFly = !!+item.onTheFly;
          });
          res.json(row);
       });
 }
 });

 app.post("/api/loans",function(req,res){
   var loans = req.body;
   connection.query('INSERT INTO loan(loan_due,loan_datestarted, loan_extensionrequested, loan_returned, loan_onthefly, loan_damagereported, loan_approved, loan_length, device_id, client_id, signout_staff_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
 [loans.due, loans.dateStarted, loans.extensionRequested, loans.returned, loans.onTheFly, loans.damageReported, loans.approved, loans.length, loans.deviceID, loans.clientID, loans.staffID],function(err,row){
   if (err) throw err;
   })
 })

 app.put("/api/loans", function(req,res){
   var loans =req.body;
   connection.query('UPDATE loan SET loan_due,loan_datestarted =?, loan_extensionrequested=?, loan_returned=?, loan_onthefly=?, loan_damagereported=?, loan_approved=?, loan_length=?, device_id=?, client_id=?, signout_staff_id=? WHERE ?',
 [loans.due, loans.dateStarted, loans.extensionRequested, loans.returned, loans.onTheFly, loans.damageReported, loans.approved, loans.length, loans.deviceID, loans.clientID, loans.staffID, loan_id = loans.loanID],
function (err,row){
  if (err) throw err;
  console.log(req.body);
})
 })


 app.delete("/api/staff", function(req, res){
   //database
    connection.query('DELETE from staff where staff_id=?',
    [parseInt(req.query.staffID)],function(err,result,fields){
   //   connection.end();
      if (err) throw err;

     });
 	//send confirmation
 	res.sendStatus(200);
 });

 app.get("/api/staff",function(req,res){
   if (req.query.staffID){
     connection.query('SELECT staff_id AS staffID, staff_firstname AS staffFirstName, staff_lastname AS staffLastName, staff_password AS password, staff_isadmin AS isAdmin, staff_email as staffEmail, disabled FROM staff WHERE staff_id=?',
       [parseInt(req.query.staffID)],function(err,row){
        // connection.end();
         if (err) throw err;

         row.forEach(function(item){
           item.isAdmin = !!+item.isAdmin;
           item.disabled = !!+item.disabled;
         });
         res.json(row[0]);
         console.log("here");
       })
   } else {
      connection.query('SELECT staff_id AS staffID, staff_firstname AS staffFirstName, staff_lastname AS staffLastName, staff_password AS password, staff_isadmin AS isAdmin, staff_email as staffEmail, disabled FROM staff',
     function (err,row){
    //   connection.end();
       if (err) throw err;
       row.forEach(function(item){
         item.isAdmin = !!+item.isAdmin;
         item.disabled = !!+item.disabled;
       })
       res.json(row);
     })
   }
 })

 app.post("/api/staff",function(req,res){
   var staff = req.body;
   connection.query('INSERT INTO staff(staff_firstname, staff_lastname, staff_password, staff_isadmin, staff_email, disabled) VALUES (?,?,?,?,?,?)',
[staff.staffFirstName,staff.staffLastName,staff.password,staff.isAdmin,staff.staffEmail,staff.disabled],function(err,row){
   if (err) throw err;
    })
 })

 app.put("/api/staff", function(req,res){
   var staff = req.body;
   connection.query('UPDATE staff SET staff_firstname, staff_lastname, staff_password, staff_isadmin, staff_email, disabled WHERE ?',
 [staff.staffFirstName,staff.staffLastName,staff.password,staff.isAdmin,staff.staffEmail,staff.disabled, staff_id = staff.staffID],
function (err,row){
  if (err) throw err;
  console.log(req.body);
})
 })

 app.delete("/api/types", function(req, res){
   //database
    connection.query('DELETE from type where type_id =?',
    [parseInt(req.query.typeID)],function(err,result,fields){
   //   connection.end();
      if (err) throw err;

     });
 	//send confirmation
 	res.sendStatus(200);
 });

 app.get("/api/types",function(req,res){
   if (req.query.typeID){
     connection.query('SELECT type_id AS typeID, type_name AS typeName, category_id AS categoryID FROM type WHERE type_id=?',
      [parseInt(req.query.typeID)],function(err,row){
      //  connection.end();
        if (err) throw err;
        res.json(row);
      })
   } else {
     connection.query('SELECT type_id AS typeID, type_name AS typeName, category_id AS categoryID FROM type',
      function(err,row){
      //  connection.end();
        if (err) throw err;
        res.json(row);
      })

   }
 })

 app.post("/api/types",function(req,res){
   var types = req.body;
   connection.query('INSERT INTO types(type_name, category_id) VALUES (?,?)',
 [types.typeName,types.categoryID],function(err,row){
   if (err) throw err;
 })
 })


 app.put("/api/types", function(req,res){
  var types = req.body;
   connection.query('UPDATE type SET type_name = ?,category_id = ? WHERE ?',
 [types.type_name,types.category_id,type_id = types.typeID],
function (err,row){
  if (err) throw err;
  console.log(req.body);
})
 })

 app.use(function(req, res) {
   res.sendFile('/', { root: '../' });
 });

 app.listen(80);

 console.log("Express app running on port 80");

 module.exports = app;
