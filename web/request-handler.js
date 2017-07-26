var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');


exports.handleRequest = function (req, res) {
  var content;
  // get path
  // archive.paths.siteAssets
  // using read file, read it and send it back
  fs.readFile(archive.paths.siteAssets+'/index.html', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    }
    content = data;
    console.log(JSON.stringify(content));

    res.end(content);
  });


  // res.end(archive.paths.list);
};


