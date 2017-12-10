var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EngineerSchema = new Schema({
  fname: { type: String , required: true },
  lname: { type: String , required: true },
  gender: { type: String , required: true },
  empid: { type : Number, required: true, unique: true },
  dob: { type: Date, default: Date.now, required: true },
  start: { type: Date, default: Date.now, required: true }
}, { versionKey: false });
// Export schema definition
module.exports = mongoose.model('Engineer', EngineerSchema);
