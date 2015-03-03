var express = require('express');
var fs = require('fs');
var path = require('path');

module.exports = function(folder) {
  var finder = require('findit')(folder);
  var router = express.Router();
 
  finder.on('file', function (file, stat) {
    var jadeExtension = ".jade";  
    var extension = path.extname(file);
      if(extension === jadeExtension) {
        
        var templateName = path.relative(folder, file)
          .replace(jadeExtension, '')
          .replace('\\', '/');
        var routeName = '/' + templateName.replace('index', '');

        router.get(routeName, function(req, res){ res.render('static/' + templateName, {}) });  
      }
  });

  return router;
};