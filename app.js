const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');

const app = express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routers/index.router.js'));
app.use('/api', require('./routers/emailPerformance.router.js'));
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
