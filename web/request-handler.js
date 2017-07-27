var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var httpHelpers = require('./http-helpers')


exports.handleRequest = function (req, res) {

  httpHelpers.serveAssets(res, '/index.html');

  // res.end(archive.paths.list);
};


