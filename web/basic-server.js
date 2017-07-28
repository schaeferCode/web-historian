var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore //Scott: ANSWER??: Archives will be what's on our local machine and so we have to initialize that data every time the server starts up.
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);

if (module.parent) {  // Scott: https://stackoverflow.com/questions/20769790/use-of-module-parent-in-nodejs
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

