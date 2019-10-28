const logger = require('../util/logger');

var express = require('express');
var url = require('url');

var hostname = process.env.API_HOST;
var userServicePort = process.env.USER_SERVICE_PORT;
var userServicePath = process.env.USER_SERVICE_PATH;

var http = require("http");
if(userServicePort == 443) {
    http = require("https");
}

var userRouter = express.Router();

userRouter.get('/:id', function(req, res) {

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var id = req.params.id;
  var token = req.get("Authorization");
  var options = {
    hostname: hostname,
    port: userServicePort,
    path: userServicePath+'/users/'+id,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };
  http.get(options, (response) => {
    const {
      statusCode
    } = response;

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
        `Status Code: ${statusCode}`);
    }
    if (error) {
      console.error(error.message);
      response.resume();
      res.status(statusCode).send({
        message: error.message
      });
     logger.logRequest('GET', options.path, token, statusCode, {}, error.message);
    }

    response.setEncoding('utf8');
    let rawData = '';
    response.on('data', (chunk) => {
      rawData += chunk;
    });
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        delete parsedData["_links"];
        res.send(parsedData);
       logger.logRequest('POST', options.path, token, response.statusCode, {}, {});
      } catch (e) {
        console.error(e.message);
      }
    });
  });
}); //end of get single user

userRouter.route('/')
    .get(function(req, res) {

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var email = req.query.email;
  var name = req.query.name;
  if(email || name){
      var query, value;
      if(email){
        query = "email";
        value = email;
      }
      else{
        query = "name";
        value = name;
      }
      var token = req.get("Authorization");
      var options = {
        hostname: hostname,
        port: userServicePort,
        path: encodeURI(userServicePath+'/users?'+query+'='+value),
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      };
      http.get(options, (response) => {
        const {
          statusCode
        } = response;

        let error;
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
        }
        if (error) {
          console.error(error.message);
          response.resume();
          res.status(statusCode).send({
            message: error.message
          });
         logger.logRequest('GET', options.path, token, response.statusCode, {}, error.message);
        }

        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', (chunk) => {
          rawData += chunk;
        });
        response.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            delete parsedData["_links"];
            res.send(parsedData);
           logger.logRequest('GET', options.path, token, response.statusCode, {}, {});
          } catch (e) {
            console.error(e.message);
          }
        });
      });
  }
  else{
    res.sendStatus(400).end();
  }
}).post(function(req, res) {

  var data = JSON.stringify(req.body);
  var token = req.get("Authorization");
  var options = {
    hostname: hostname,
    port: userServicePort,
    path: userServicePath+'/users',
    method: 'POST',
    headers: {
          'Content-Type': 'application/json',
          'Authorization': token
     }
  };

  var request = http.request(options, function(response) {
    // response.setEncoding('utf8');
    if (response.statusCode == 201) {
        response.on('data', function(body) {
        var respBody = JSON.parse(body);
        delete respBody["_links"];
        res.send(respBody);
       logger.logRequest('POST', options.path, token, response.statusCode, req.body, {});
      });
    } else if(response.statusCode == 409) {
        res.status(response.statusCode)
        .send("Email already exists");
       logger.logRequest('POST', options.path, token, response.statusCode, req.body, {});
    } else {
      response.on('data', function(body) {
        var b = JSON.parse(body);
        res.status(response.statusCode).send({
            message: b[0].debugMessage
        });
       logger.logRequest('POST', options.path, token, response.statusCode, req.body, {});
      });
    }
  });
  // write data to request body
  request.write(data);
  request.end();
}); //end of post user

module.exports = userRouter