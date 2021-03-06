'use strict';

// Import packages and initiate express app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var config = require('../config/default.json');

require('moment');
mongoose.set('debug', true);
//var currentWeekNumber = require('current-week-number');
console.log('xxxx');
// Configure app for bodyParser() to let us grab data from the body of POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup port for server to listen on (use PORT or 3000 if PORT not set)
var port = process.env.PORT || 3000;

// Connecte to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.db, { useMongoClient: true });

// Add path to static content (HTML homepage) for Single Page Application (SPA) that will serve SWF content
// Express will by default look for index.html if it is not supplied i.e. localhost:3000
app.use(express.static(path.join(__dirname, '../public')));

// Setup API routes (all to be prefixed with /api). All functions generated by router will be applied to our application
var router = express.Router();
app.use('/api', router);

// Start the server (environment variable or port 3000 if not defined)
app.listen(port);
console.log('Server listening on port ' + port);

// ------------------------- BASIC SERVER CREATED --------------------- //

// Add in schema objects
var Engineer = require('../models/engineer');
var Schedule = require('../models/schedule');

// Add in bespoke functions for application
var SwfFn = require("../functions/supportSched_functions.js");

// Middleware - useful for validation, logging or stopping request from cotinuing in event request is not safe
router.use(function (req, res, next) {
  console.log('Request received');
  //app.use(express.static(path.join(__dirname, 'public')));
  // move on to route; if not there request stops here.
  next();
});

// Test Route (to see if everything is running)
router.get('/', function (req, res) {
  res.json({ message: 'Welcome to the API' });
});

// ------------------------- API for Engineer --------------------- //
// create engineer and get all engineers
router.route('/engineers').post(function (req, res) {
  // Count number of records
  Engineer.count({}, function (err, count) {
    console.log("Number of docs: ", count);
    if (count > 10) {
      console.log("More than 10 engineers now; the 10 most senior engineers will be scheduled");
    }
  });
  // create record
  var engineer = new Engineer();
  engineer.fname = req.body.fname;
  engineer.lname = req.body.lname;
  engineer.gender = req.body.gender;
  engineer.empid = req.body.empid;
  engineer.dob = req.body.dob;
  engineer.start = req.body.start;

  // save record
  engineer.save(function (err) {
    // if error on save  output error otherwise print confirmation note
    if (err) {
      res.send(err);
    }
    res.json({ message: "Engineer record created" });
  });
}).get(function (req, res) {
  Engineer.find(function (err, engineer) {
    if (err) {
      res.send(err);
    }
    res.json(engineer);
  });
});

// get engineer based on mongo ID
router.route('/engineers/id/:engineer_id').get(function (req, res) {
  Engineer.findById(req.params.engineer_id, function (err, engineer) {
    if (err) {
      res.send(err);
    }
    res.json(engineer);
  });
});

// get engineer based on gender
router.route('/engineers/gender/:gender').get(function (req, res) {
  // need to match attribute make in d/b to parameter in function; implicit for the _id lookup
  Engineer.find({ gender: req.params.gender }, function (err, engineer) {
    if (err) {
      res.send(err);
    }
    res.json(engineer);
  });
});

// get or delete engineer based on employee ID
router.route('/engineers/:empid').get(function (req, res) {
  Engineer.find({ empid: req.params.empid }, function (err, engineer) {
    if (err) {
      res.send(err);
    }
    res.json(engineer);
  });
}).delete(function (req, res) {
  Engineer.remove({ empid: req.params.empid }, function (err, engineer) {
    if (err) {
      res.send(err);
    }
    res.json(engineer);
  });
});

// ------------------------- API for Schedule --------------------- //

// get entire schedule
router.route('/schedules/').get(function (req, res) {
  Schedule.find(function (err, schedule) {
    if (err) {
      res.send(err);
    }
    res.json(schedule);
    console.log('Schedule GET (all) Completed');
  });
});

// get schedule based on mongo ID
router.route('/schedules/id/:schedule_id').get(function (req, res) {
  Schedule.findById(req.params.schedule_id, function (err, schedule) {
    if (err) {
      res.send(err);
    }
    res.json(schedule);
    console.log('Schedule GET (schedule_id) Completed');
  });
});

// get engineer based on employ ee ID
router.route('/schedules/empid/:empid').get(function (req, res) {
  Schedule.find({ empid: req.params.empid }, function (err, schedule) {
    if (err) {
      res.send(err);
    }
    res.json(schedule);
    console.log('Schedule GET (empid) Completed');
  });
});

// get schedule based on date
router.route('/schedules/date/:date').get(function (req, res) {
  Schedule.find({ date: req.params.date }, function (err, schedule) {
    if (err) {
      res.send(err);
    }
    res.json(schedule);
    console.log('Schedule GET (date) Completed');
  });
});

// create, get and delete schedule for period in a year
// - peroiod starts on week schedule_period and extends for 2 weeks
// - period must be an odd number and includes 1 e.g. 1,3,5,7 etc.

router.route('/schedules/:schedule_year/:schedule_period').post(function (req, res) {
  // create record
  var query = getEngineerIDs();
  query.exec(function (err, records) {
    if (err) return console.log(err);
    var results = SwfFn.populateCalendar(SwfFn.assignEngineers(records), +req.params.schedule_year, req.params.schedule_period);
    if (results.length == 0) {
      console.log('Schedule not generated');
    }
    for (var count in results) {
      // Write record to Mongo using upsert; if records for future date already
      // here then overwrite them otherwise insert. This is ok since the period
      // is in the future
      Schedule.findOneAndUpdate({ ymd: results[count].ymd, shift: results[count].shift }, results[count], { upsert: true, new: true, runValidators: true }, function (err, res) {
        if (err) res.send(err);
      });
    }
  });
  console.log('Schedule POST(year/weekstart) Completed');
  res.json({ message: 'Schedule POST (year/weekstart) Completed' });
}).get(function (req, res) {
  Schedule.find({ $and: [{ yr: req.params.schedule_year }, { wn: { $in: [req.params.schedule_period, parseInt(req.params.schedule_period) + 1] } }] }, function (err, schedule) {
    if (err) {
      res.send(err);
    }
    res.json(schedule);
    console.log('Schedule GET(year/weekstart) Completed');
  });
}).delete(function (req, res) {
  Schedule.remove({ $and: [{ yr: req.params.schedule_year }, { wn: { $in: [req.params.schedule_period, parseInt(req.params.schedule_period) + 1] } }] }, function (err, schedule) {
    if (err) res.send(err);
    console.log('Schedule DELETE(year/weekstart) Completed');
    res.json({ message: 'Schedule DELETE(year/weekstart) Completed' });
  });
  //console.log('Schedule GET Completed');
});

// Get Engineer IDs
function getEngineerIDs() {
  var query = Engineer.find({}, { empid: 1, _id: 0 });
  return query;
}
//# sourceMappingURL=server.js.map