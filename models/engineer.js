var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EngineerSchema = new Schema({
  fname: String,
  lname: String,
  gender: String,
  empid: Number,
  dob: { type: Date, default: Date.now },
  start: { type: Date, default: Date.now }
}, { versionKey: false });
// Export schema definition
module.exports = mongoose.model('Engineer', EngineerSchema);
