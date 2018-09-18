const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Debug = require('debug');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require("cors");
const fileUpload = require('express-fileupload');


const MongoConnect = require('./core/mongoconnect');
new MongoConnect();
// import favicon from 'serve-favicon';

const index = require('./routes/index');
const app = express();


const  whitelist = [
  "http://muldr.delenta.xyz",
  "http://test_upload.delenta.xyz"
];
const  corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors()); // include before other routes
app.options("*", cors(corsOptions)); // include before other routes



const debug = Debug('medea-uploader:app');
app.set('views', path.join(__dirname, 'views'));






// view engine setup
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(fileUpload());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});


module.exports = app;
