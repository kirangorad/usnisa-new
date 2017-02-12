// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var propertySchema = new Schema({
  propertyName: { type: String, required: true },
  propertyCity: { type: String, required: true },
  propertyArea: { type: String, required: true },
  propertyType: { type: String, required: true },
  propertyCost: String, 
  propertyDescription: String,
  propertyPictures: [String]
});

// the schema is useless so far
// we need to create a model using it users is the table name
var Property = mongoose.model('property', propertySchema);

// make this available to our users in our Node applications
module.exports = Property;