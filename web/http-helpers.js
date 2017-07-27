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

exports.serveAssets = function(res, asset, callback) {
  var content;
  fs.readFile(archive.paths.siteAssets + asset, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    content = data;
    console.log(JSON.stringify(content));
    res.end(content);
  });

  // purpose: we call this function anytime we need to server index.html or any other site.

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
