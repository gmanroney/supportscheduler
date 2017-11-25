var mongoose = require('mongoose');  
var engineerSchema = new mongoose.Schema({  
  fname: String,
  lname: String,
  gender: String,
  empid: Number,
  dob: { type: Date, default: Date.now },
  start: { type: Date, default: Date.now }
});
mongoose.model('Engineer', engineerSchema);
