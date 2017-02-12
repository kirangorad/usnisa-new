var express = require('express');
var router = express.Router();

//to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({status:401,msg:'login first'});
}

module.exports = function(passport) {
	
	/* Logout the curent user. */
	router.get('/logout', isLoggedIn, function(req, res, next) {
		req.logout();
		res.json('{"message":"User logged out successfully"}');
	});
	
	/* process the login Request. */
	router.post('/login', passport.authenticate('local-login'),function(req,res,next) {
      res.json({status:200, msg:'User logged in successfully'});
    });
	
	/* process the login Request. */
	router.post('/signup', passport.authenticate('local-signup'),function(req,res,next) {
      res.json({status:200, msg:'User created'});
    });
	
	/* process the check user is logged in or not. */
	router.get('/check', isLoggedIn,function(req,res,next) {
      res.json({status:200, msg:'Authenticated'});
    });
	
	/* process the check user is logged in or not. */
	router.get('/checkAdmin', isLoggedIn,function(req,res,next) {
		
	  if(req.user.local.role === 'admin')	
		  res.json({status:200, msg:'you are admin'});
	  else
		  res.json({status:403, msg:'you are not admin'});
    });
	
	return router;
};

