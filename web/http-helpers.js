var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

/*
readfile = function (asset, encoding, callback) {
  fs.readFile(asset, encoding, callback)
}
*/
exports.serveAssets = function(res, url, callback) {
  console.log(url);
  // read file at the url in the public dir
  fs.readFile(archive.paths.siteAssets + url, 'utf8', function(err, data) {
    // if error
    if (err) {
      // return 404 send404
      fs.readFile(archive.paths.archivedSites + url, 'utf8' , function(err, data) {
        if (err) {
          callback ? callback() : exports.send404(res);
        } else {
          exports.sendResponse(res, data);
        }
      });
    } else {  // if no error
      // call sendResponse
      exports.sendResponse(res, data, 200);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!





exports.sendRedirect = function(response, location, status) {
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};

exports.sendResponse = function(response, obj, status) {
  status = status || 200;
  response.writeHead(status, exports.headers);
  response.end(obj);
};

exports.collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(data);
  });
};

exports.send404 = function(response) {
  exports.sendResponse(response, '404: Page not found', 404);
};




