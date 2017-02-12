// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var feedbackSchema = new Schema({
  feedbackName: { type: String, required: true },
  feedbackEmail: { type: String, required: true },
  feedbackSubject: { type: String, required: true },
  feedbackMessage: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it users is the table name
var Feedback = mongoose.model('feedback', feedbackSchema);

// make this available to our users in our Node applications
module.exports = Feedback;