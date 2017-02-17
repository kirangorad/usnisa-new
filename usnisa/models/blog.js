// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var blogSchema = new Schema({
  blogTitle: { type: String, required: true },
  blogAuthor: { type: String, required: true },
  blogDate: { type: Date, default: Date.now },
  blogDescription: String,
  blogPictures: [String]
});

// the schema is useless so far
// we need to create a model using it users is the table name
var blog = mongoose.model('blog', blogSchema);

// make this available to our users in our Node applications
module.exports = blog;