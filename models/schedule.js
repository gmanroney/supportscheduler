var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ScheduleSchema = new Schema({
  empid: Number,
  date: { type: Date, default: Date.now },
  shift: { type : Number, required : true, unique : true,
           validate : { validator : Number.isInteger, message : '{VALUE} is not an integer value' }}
});
// Export schema definition
module.exports = mongoose.model('Schedule', ScheduleSchema);
