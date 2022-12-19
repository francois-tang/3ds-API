//require("./models/db.js");
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
const flash = require('connect-flash');
var cookieParser = require('cookie-parser');

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Connect flash
app.use(flash());

// Global variables
//app.use(function(req, res, next) {
 // res.locals.success_msg = req.flash('success_msg');
 // res.locals.error_msg = req.flash('error_msg');
 // res.locals.error = req.flash('error');
 // next();
//});

// Routes
//app.use('/', require('./routes/index.router.js'));
//app.use('/users', require('./routes/users.router.js'));
//app.use('/movies', require('./routes/movies.router.js'));

app.get('/', function(req, res) {
    res.render('index');
});


// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
