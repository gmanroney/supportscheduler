var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ScheduleSchema = new Schema({
  empid: { type: Number, required: true },
  ymd: String,
  wn: Number,
  yr: Number,
  date: { type: Date, required: true, default: Date.now },
  shift: { type : Number, required : true,
           validate : { validator : Number.isInteger, message : '{VALUE} is not an integer value' }}
},{ versionKey: false });
// Export schema definition
module.exports = mongoose.model('Schedule', ScheduleSchema);
