(function() {
  'use strict';

  const express = require('express');
  const world = require('forthright48/world');
  const path = require('path');
  const Gate = require(path.join(world.root, '/models/gateway/gateway.js')).model;

  const router = express.Router();

  router.get('/', getSearch);
  router.post('/', postSearch);

  module.exports = {
    addRouter(app) {
      app.use('/gateway/search', router);
    }
  };

  /*******************************************
  Implementation
  *******************************************/

  function getSearch(req, res) {
    return world.myRender(req, res, 'gateway/search', {
      msg: 'Search a problem',
      state: 'blank'
    });
  }

  function postSearch(req, res, next) {
    const platform = req.body.platform;
    const pid = req.body.pid;

    Gate.findOne({
      platform,
      pid
    }, function(err, doc) {
      if (err) return next(err);

      if (!doc) return world.myRender(req, res, 'gateway/search', {
        msg: 'No such problem, try again',
        state: 'not found'
      });

      return world.myRender(req, res, 'gateway/search', {
        state: 'found',
        parentId: doc.parentId
      });
    });
  }
}());
