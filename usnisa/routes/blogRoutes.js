var express = require('express');
var router = express.Router();

//load up the blog model
var Blog = require('../models/blog');

//to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({status:401,msg:'login first'});
}

module.exports = function(passport) {
	
	/* GET blog listing. */
	router.get('/', function(req, res, next) {
		//Find all blogs in db
		Blog.find({}, function(err, blog) {
			  if (err) { throw err; }
			  res.json(blog);
		});
	});

	/* GET a blog. */
	router.get('/:blogID', function(req, res, next) {
		Blog.find({'_id':req.params.blogID}, function(err, blog) {
			if (err) { throw err; }
			res.json(blog);
		});
	});

	/* POST add a blog. */
	router.post('/', isLoggedIn, function(req, res, next) {
		
			var blogToAdd = new Blog();
			blogToAdd.blogTitle = req.body.blogTitle;
			blogToAdd.blogAuthor = req.body.blogAuthor;
			blogToAdd.blogDescription = req.body.blogDescription;
			req.body.blogPictures.forEach(function(imageValue){
				blogToAdd.blogPictures.push(imageValue);
			});
			
			
			blogToAdd.save(function(err){
				if (err) { throw err; }
				res.json({status:200, msg:'Blog created'});
				res.end();
			});
		
			
	});

	/* PUT update blog. */
	router.put('/:blog_id', isLoggedIn, function(req, res, next) {
		Blog.findById(req.params.blog_id, function(err, blog) {
			if (err) { throw err; }
			  
			blog.blogTitle = req.body.blogTitle;
			blog.blogAuthor = req.body.blogAuthor;
			blog.blogDescription = req.body.blogDescription;
			req.body.blogPictures.forEach(function(imageValue){
				blog.blogPictures.push(imageValue);
			});
			
			blog.save(function(err){
			  if (err) { throw err; }
			  res.json({status:200, msg:'Blog updated'});
			});
		});
	});

	/* DELETE delete a blog. */
	router.delete('/:blog_id', isLoggedIn, function(req, res, next) {
	  Blog.findByIdAndRemove(req.params.blog_id, function(err, blogID) {
			if (err) { throw err; }
			res.json({status:200, msg:'Blog removed'});
		});
	});
	
	return router;
};

