var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');
const { sequelize } = require("./models");
var indexRouter = require('./routes/index');
const userRouter = require('./controllers/userController')
const adRouter = require('./controllers/adController')
const logger = require('./utils/logger')
require('dotenv').config()
const cors = require('cors');


const models = require('./models/index.js')

var app = express();
app.use(cors());

//database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);
app.use('/', adRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


app.listen(process.env.PORT);
module.exports = app;