(function() {
  'use strict';
  const express = require('express');
  const path = require('path');
  const fs = require('fs');
  const marked = require('marked');
  const world = require('forthright48/world');

  const router = express.Router();

  router.get('/', function(req, res) {
    res.redirect('/cpps/notebook.md');
  });

  router.get('/*', function(req, res, next) {
    const fileName = req.params[0];
    const filePath = path.join(__dirname, '../../models/cpps', fileName);

    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) return next(err);
      marked(data, function(err, content) {
        if (err) return next(err);

        // TODO: Delimit backslash inside content
        return world.myRender(req, res, 'cpps/cpps', {
          data: content,
        });
      });
    });
  });

  module.exports = {
    addRouter(app) {
      app.use('/cpps', router);
    },
  };
}());
