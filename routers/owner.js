const logger = require('../util/logger');

var express = require('express');

var k8sHostname = process.env.K8S_API_HOST;
var accessManagementServicePath = process.env.ACCESS_MANAGEMENT_SERVICE_PATH
var accessManagementServicePort = process.env.ACCESS_MANAGEMENT_SERVICE_PORT

var http = require("http");
if(accessManagementServicePort == 443) {
    http = require("https");
}

var ownerRouter = express.Router();

ownerRouter.get('/', function(req, res) {

    var token = req.get("Authorization");

    var options = {
        hostname: k8sHostname,
        port: accessManagementServicePort,
        path: accessManagementServicePath + '/owners',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.get(options, response => {
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

});

ownerRouter.route('/:id')
    .get(function(req, res) {

    var token = req.get("Authorization");

    var id = req.params.id;

    var options = {
        hostname: k8sHostname,
        port: accessManagementServicePort,
        path: accessManagementServicePath + '/owners/' + id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.get(options, response => {
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

});

module.exports = ownerRouter