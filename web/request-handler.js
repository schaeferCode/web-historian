var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var url = require('url');

var actions = {
  'GET': function (req, res) {
    var urlPath = url.parse(req.url).pathname;
    console.log(9, urlPath)

    if (urlPath === '/') {
      urlPath = '/index.html';
    }

    httpHelpers.serveAssets(res, urlPath, function () {
      console.log(13);
      if (urlPath[0] === '/') {
        urlPath = urlPath.slice(1);
      }
      // check if URL is in sites.txt
      archive.isUrlInList (urlPath, function (found) {
        // if it is, then serve it up
        console.log(20);
        if (found) {
          httpHelpers.sendRedirect(res, '/loading.html', 302);
        }
        else {  // otherwise return 404
          httpHelpers.send404(res);
        }
      });
    });
  },
  'POST': function (req, res) {
    httpHelpers.collectData(req, function (data) {
      var url = data.split('=')[1].replace('http://', '');
      archive.isUrlInList(url, function (found) {
      //check if it is in sites.txt (isUrlInList)
        if (found) {
          //check to see if it is in archive (isUrlArchived)
          archive.isUrlArchived(url, function (found) {
            if (found) {
              //redirect user to that page
              httpHelpers.sendRedirect(res, '/' + url, 302);
            } else {
              //otherwise, redirect them to loading.html
              httpHelpers.sendRedirect(res, '/loading.html', 302);
            }
          });
        } else {
          //add the url to sites.txt (addUrlToList)
          archive.addUrlToList(url, function () {
            httpHelpers.sendRedirect(res, '/loading.html', 302);
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  var handler = actions[req.method];
  if (handler) {
    handler(req, res);
  } else {
    httpHelpers.send404(res);
  }
};







