require('dotenv').config({path: './.env'});
var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
const schedule = require('node-schedule');
const nvdRoutine = require('./app/utils/nvdScheduleRoutine');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next)
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// app.use('/', indexRouter);
app.use(indexRouter);

// scheduler
schedule.scheduleJob(process.env.SCHEDULE, nvdRoutine('some args in nvd'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`App running on ${port}\nhttp://localhost:5000`);
});

module.exports = app;
