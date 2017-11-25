var mongoose = require('mongoose');  
var refdateSchema = new mongoose.Schema({  
  date: { type: Date, default: Date.now },
  isholiday: Boolean,
  isweekend: Boolean,
  weeknumber: { type : Number, required : true, unique : true,
                validate : { validator : Number.isInteger, message : '{VALUE} is not an integer value' }}
});
mongoose.model('Refdate', refdateSchema);
