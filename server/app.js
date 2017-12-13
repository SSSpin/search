var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();
var config=require('./config.js');
//日志
var bunyan = require('bunyan');
var log = bunyan.createLogger({ name: 'OAuth' });
var expressBunyanLogger = require('express-bunyan-logger');

//mysql
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database:'search_source',
    port:'3306'
});

global.pool=pool;
//middleware
var responseExtend = require('./middleware/responseExtend');
var checkTokenExtend = require('./middleware/checkTokenExtend');
log.info('app start on port:' + (process.env.PORT||3000));

//设置日志
app.use(expressBunyanLogger({
  parseUA: false,
  name: 'OAuth',
  immediate: true,
  streams: [{
    level: 'error',
    path: './error.log'
  }],
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  includesFn: function(req, res) {
    return req.params
  }
}));
//设置模板路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//扩展res方法
app.use(responseExtend);
app.use(checkTokenExtend);
//设置路由及controller
for (var p in routes) {
  app.use(p, routes[p]);
}
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
