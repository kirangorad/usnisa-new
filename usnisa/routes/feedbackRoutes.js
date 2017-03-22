'use strict';
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'usnisa.web@gmail.com',
        pass: 'Nodejs@ajs'
    }
});


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



/* Mail feedback to the admin */
function sendMails(feedbackToAdd) {

	// setup email data with unicode symbols
	let mailOptionsAdmin = {
	    from: 'usnisa.web@gmail.com', // sender address
	    to: 'kirangorad4u@gmail.com, you@usnisa.in', // list of receivers
	    subject: 'USNISA -  New Enquiry', // Subject line
	    //text: 'Please Find the detals below', // plain text body
	    html: 	'<h3>There is a new enquiry</h3>'+
	    		'<h4>Please find the details below</h4>'+
	    	  	'<br/><b>Name :</b>' + feedbackToAdd.feedbackName +
	    	  	'<br/><b>Phone :</b>' + feedbackToAdd.feedbackPhone +
	    	  	'<br/><b>Email :</b>' + feedbackToAdd.feedbackEmail +
	    	  	'<br/><b>Subject :</b>' + feedbackToAdd.feedbackSubject +
	    	  	'<br/><b>Message :</b>' + feedbackToAdd.feedbackMessage 
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptionsAdmin, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Admin Mail %s sent: %s', info.messageId, info.response);
	});
	
	// setup email data with unicode symbols
	let mailOptionsUser = {
	    from: 'usnisa.web@gmail.com', // sender address
	    to: feedbackToAdd.feedbackEmail, // list of receivers
	    subject: 'USNISA -  Thank you for Enquiry', // Subject line
	    text: 'Hello world ?', // plain text body
	    html: '<h3>Thank you very much for your query</h3> <h4>We will get back to you soon</h4> <a href="https://usnisa.in">USNISA</a>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptionsUser, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('User Mail %s sent: %s', info.messageId, info.response);
	});
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
			feedbackToAdd.feedbackPhone = req.body.feedbackPhone;
			feedbackToAdd.feedbackEmail = req.body.feedbackEmail;
			feedbackToAdd.feedbackSubject = req.body.feedbackSubject;
			feedbackToAdd.feedbackMessage = req.body.feedbackMessage;
			
			feedbackToAdd.save(function(err){
				if (err) { throw err; }
				sendMails(feedbackToAdd);
				res.json({status:200, msg:'Feedback created'});
				res.end();
			});
		
			
	});

	/* DELETE delete a Feedback. */
	router.delete('/:Feedback_id', isAdminLoggedIn, function(req, res, next) {
	  res.send('delete Feedback');
	});

	/* Mail feedback to the admin */
	router.post('/mailAdmin', function(req, res, next) {

		// setup email data with unicode symbols
		let mailOptionsAdmin = {
		    from: '"kirangorad4u@gmail.com', // sender address
		    to: 'kirangorad4u@gmail.com, kiran.gorad@yahoo.in', // list of receivers
		    subject: 'USNISA -  New Enquiry', // Subject line
		    text: 'Hello world ?', // plain text body
		    html: '<b>Check it out</b>'+req.body // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptionsAdmin, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Admin Mail %s sent: %s', info.messageId, info.response);
		    res.json({status:200, msg:'Mail Sent'});
			res.end();
		});
			
	});

	/* Mail feedback to the user*/
	router.post('/mailUser', function(req, res, next) {
		
		// setup email data with unicode symbols
		let mailOptionsUser = {
		    from: '"kirangorad4u@gmail.com', // sender address
		    to: 'kirangorad4u@gmail.com, kiran.gorad@yahoo.in', // list of receivers
		    subject: 'USNISA -  Thank you for Enquiry', // Subject line
		    text: 'Hello world ?', // plain text body
		    html: '<h3>Thank you very much for your query</h3> <h4>We will get back to you soon</h4> <a href="usnisa.in">USNISA</a>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptionsUser, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('User Mail %s sent: %s', info.messageId, info.response);
		    res.json({status:200, msg:'Mail Sent'});
			res.end();
		});
		
			
	});

	return router;
};

