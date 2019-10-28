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

var domainRouter = express.Router();

domainRouter.route('/')
    .get(function(req, res) {

        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        var token = req.get("Authorization");

        var options = {
          hostname: hostname,
          port: userServicePort,
          path: userServicePath + '/domains',
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
          if(statusCode !== 200) {
            error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
          }

          if (error) {
            console.error(error.message);
            // consume response data to free up memory
            response.resume();
            response.status(statusCode).send({
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
                res.send(parsedData);
               logger.logRequest('GET', options.path, token, response.statusCode, {}, {});
              } catch (e) {
                console.error(e.message);
              }
            });
          });

    }).put(function(req, res) {

        var token = req.get("Authorization");
        var data = JSON.stringify(req.body);
        var options = {
            hostname: hostname,
            port:
            userServicePort,
            path: userServicePath + '/domains',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        var request = http.request(options, function(response) {
            if(response.statusCode == 200) {
                res.sendStatus(200).end();
               logger.logRequest('PUT', options.path, token, response.statusCode, req.body, {});
            } else {
                res.status(response.statusCode).send({
                    message: response.text
                });
               logger.logRequest('PUT', options.path, token, response.statusCode, req.body, response.text);
            }
        });

        request.write(data);
        request.end();

    });

module.exports = domainRouter