var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var VehicleSchema = new Schema ({
  make: String,
  model: String,
  colour: String
});
// Export schema definition
module.exports = mongoose.model('Vehicle', VehicleSchema);
