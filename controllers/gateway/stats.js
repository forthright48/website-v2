(function() {
  'use strict';

  const express = require('express');
  const world = require('forthright48/world');
  const path = require('path');
  const Gate = require(path.join(world.root, '/models/gateway/gateway.js')).model;
  const async = require('async');
  const moment = require('moment');

  const router = express.Router();

  router.get('/', getStats);

  module.exports = {
    addRouter(app) {
      app.use('/gateway/stats', router);
    }
  };

  /*******************************************
  Implementation
  *******************************************/

  function getStats(req, res, next) {
    const duration = {};

    duration.now = moment();
    duration.month = moment()
      .subtract(1, 'months')
      .startOf('day')
      .format();
    duration.week = moment()
      .subtract(1, 'weeks')
      .startOf('day')
      .format();
    duration.two = moment()
      .subtract(2, 'days')
      .startOf('day')
      .format();

    async.parallel({
      month(call) {
        Gate
          .where('createdAt')
          .gte(duration.month)
          .count(function(err, cnt) {
            if (err) return call(err);
            return call(null, cnt);
          });
      },
      week(call) {
        Gate
          .where('createdAt')
          .gte(duration.week)
          .count(function(err, cnt) {
            if (err) return call(err);
            return call(null, cnt);
          });
      },
      two(call) {
        Gate
          .where('createdAt')
          .gte(duration.two)
          .count(function(err, cnt) {
            if (err) return call(err);
            return call(null, cnt);
          });
      }
    }, function(err, result) {
      if (err) return next(err);
      return world.myRender(req, res, 'gateway/stats', result);
    });
  }
}());
