var OktaJwtVerifier = require('@okta/jwt-verifier');
var express = require('express');

const logger = require('../util/logger');

var oktaDefaultOrgUrl = process.env.OKTA_DEFAULT_URL;
var clientId = process.env.CLIENT_ID;
var hostname = process.env.API_HOST;
var authenticationServicePath = process.env.AUTHENTICATION_SERVICE_PATH;
var authenticationServicePort = process.env.AUTHENTICATION_SERVICE_PORT;

var http = require("http");
if(authenticationServicePort == 443) {
    http = require("https");
}

var tokenRouter = express.Router();

var oktaJwtVerifier = new OktaJwtVerifier({
  issuer: oktaDefaultOrgUrl,
  clientId: clientId
});

tokenRouter.post('/login', function(req, res) {

  var data = JSON.stringify(req.body);
  var options = {
    hostname: hostname,
    port: authenticationServicePort,
    path: authenticationServicePath + '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MPLATFORM-APP-ID': 'usermgmt'
    }
  };

  var request = http.request(options, function(response) {
    // response.setEncoding('utf8');
    if (response.statusCode == 200) {

          response.on('data', function(body) {
            var respBody = JSON.parse(body);
            req.body['password'] = '********'
            logger.logRequest('POST', options.path, "", response.statusCode, req.body, {});
            var accessTokenString = respBody.access_token;
            oktaJwtVerifier.verifyAccessToken(accessTokenString)
              .then(jwt => {
                // the token is valid
                var user = {};
                user.token = accessTokenString;
                user.id = jwt.claims.cid;
                user.username = jwt.claims.sub;
                respBody.user = user;
                res.send(user);
              })
              .catch(err => {
                res.status(401).send({
                  message: response.text
                });
              });
      });

    } else {
      res.status(response.statusCode).send({
        message: response.text
      });
    }
  });

  // write data to request body
  request.write(data);
  request.end();

}); //end of post login

tokenRouter.post('/verification', function(req, res) {
    oktaJwtVerifier.verifyAccessToken(req.body['token'])
      .then(jwt => res.send(jwt))
      .catch(err => res.status(400).send({message: err.message}));
});

module.exports = tokenRouter