// load the things we need
var mongoose = require('mongoose');
// define the schema for our item model
var itemSchema = mongoose.Schema({

    item            : {
        category        : String,
        cost     : String,
        flowername : String,
        image : String
    }
});

// create the model for item and expose it to our app
module.exports = mongoose.model('Item', itemSchema);
