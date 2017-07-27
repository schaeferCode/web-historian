var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require('./http-helpers');


exports.handleRequest = function (req, res) {

  var asset;

  if (req.url === '/') {
    asset = archive.paths.siteAssets + '/index.html';
  } else {
    asset = archive.paths.archivedSites + req.url;
    console.log(asset);
  }



  httpHelpers.serveAssets(res, asset);


  //localhost:8080/www.google.com
  //request.url === /www.google.com

  console.log(req.url);

  // httpHelpers.serveAssets(res, '/www.google.com');


  // res.end(archive.paths.list);
};


