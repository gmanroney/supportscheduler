var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RefdateSchema = new Schema({
  date: { type: Date, default: Date.now },
  isholiday: Boolean,
  title: String,
  isweekend: Boolean,
  weeknumber: { type : Number, required : true, unique : true,
                validate : { validator : Number.isInteger, message : '{VALUE} is not an integer value' }}
});
// Export schema definition
module.exports = mongoose.model('Refdate', RefdateSchema);
