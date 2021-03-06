var express = require('express');
var compression = require('compression')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var configDB = require('./config/database');

var routes = require('./routes/index');
var authRoutes = require('./routes/authRoutes')(passport);
var adminRoutes = require('./routes/adminRoutes')(passport);
var listingsRoutes = require('./routes/listingsRoutes')(passport);
var feedbackRoutes = require('./routes/feedbackRoutes')(passport);
var blogRoutes = require('./routes/blogRoutes')(passport);
//var users = require('./routes/users');

//configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


var app = express();

app.use(compression());

// view engine setup
//app.set('views', path.join(__dirname, 'public'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//required for passport
//required for passport session
app.use(session({
  secret: 'secrettexthere',
  //saveUninitialized: true,
  //resave: true,
  // using store session on MongoDB using express-session + connect
//  store: new MongoStore({
//    url: configDB.url,
//    collection: 'sessions'
//  })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Allow cross origin requests
app.use(function(req, res, next) {
  //res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//To handle the post request to root
app.post("/", function(req, res) {
  res.redirect('/');
});

//app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/list', listingsRoutes);
app.use('/fback', feedbackRoutes);
app.use('/blog', blogRoutes);
app.use('/admin', adminRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
