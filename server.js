const logger = require('./util/logger');

require('dotenv').config();

var userRouter = require('./routers/user');
var tokenRouter = require('./routers/token');
var ownerRouter = require('./routers/owner');
var domainRouter = require('./routers/domain');

var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var url = require('url');

const path = require('path');

var hostname = process.env.API_HOST;
var userServicePort = process.env.USER_SERVICE_PORT;
var userServicePath = process.env.USER_SERVICE_PATH;

var http = require("http");
if(userServicePort == 443) {
    http = require("https");
}

var accessMgmtRouter = express.Router();
accessMgmtRouter.use('/api/users', userRouter);
accessMgmtRouter.use('/api/token', tokenRouter);
accessMgmtRouter.use('/api/owners', ownerRouter);
accessMgmtRouter.use('/api/domains', domainRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/authorization-admin', accessMgmtRouter);

//redirect
app.get('/', function(req, res) {
  res.redirect('/authorization-admin')
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  accessMgmtRouter.use(express.static(path.join(__dirname, 'build')));

  // Handle React routing, return all requests to React app
  accessMgmtRouter.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  };
  console.log('Listening on port ' + port);
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});