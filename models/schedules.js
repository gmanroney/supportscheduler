var mongoose = require('mongoose');  
var scheduleSchema = new mongoose.Schema({  
  empid: Number,
  date: { type: Date, default: Date.now },
  shift: { type : Number, required : true, unique : true,
           validate : { validator : Number.isInteger, message : '{VALUE} is not an integer value' }}
});
mongoose.model('Schedule', scheduleSchema);
