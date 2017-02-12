var express = require('express');
var router = express.Router();

//load up the item model
var Feedback = require('../models/feedback');

//to ensure user is logged in
function isAdminLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
		if(req.user.local.role === 'admin')	
		  return next();
	  else
		  res.json({status:403, msg:'you are not admin'});
    }
    res.json({status:401,msg:'login first'});
}

module.exports = function(passport) {
	
	/* GET feedback listing. */
	router.get('/', isAdminLoggedIn, function(req, res, next) {
		//Find all properties in db
		Feedback.find({}, function(err, Feedback) {
			  if (err) { throw err; }
			  res.json(Feedback);
		});
	});

	/* POST add a Feedback. */
	router.post('/', function(req, res, next) {
		
			var feedbackToAdd = new Feedback();
			feedbackToAdd.feedbackName = req.body.feedbackName;
			feedbackToAdd.feedbackEmail = req.body.feedbackEmail;
			feedbackToAdd.feedbackSubject = req.body.feedbackSubject;
			feedbackToAdd.feedbackMessage = req.body.feedbackMessage;
			
			feedbackToAdd.save(function(err){
				if (err) { throw err; }
				res.json({status:200, msg:'Feedback created'});
				res.end();
			});
		
			
	});

	/* DELETE delete a Feedback. */
	router.delete('/:Feedback_id', isAdminLoggedIn, function(req, res, next) {
	  res.send('delete Feedback');
	});
	
	return router;
};

