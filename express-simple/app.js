var createError = require('http-errors');
var express = require('express');
const fs = require('fs')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
var userRouter = require('./routes/user')
const blogRouter = require('./routes/blog');

var app = express();

// view engine setup,just for front-end
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// logger handler  -- default:{stream: process.stdout}
const ENV = process.env.NODE_ENV
if (ENV !== 'produciton') {
  app.use(logger('dev'));
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

// handler request.body 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie handler 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// redis handler
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})

// session handler 
app.use(session({
  secret: 'TEDS_890#',
  cookie: {
    path: '/',  // default
    httpOnly: true, // default
    maxAge: 24 * 60 * 60 * 1200
  },
  store: sessionStore   // save session into redis
}))

// router handler 
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
