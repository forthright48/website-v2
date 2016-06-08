(function() {
  'use strict';

  const express = require('express');
  const world = require('forthright48/world');
  const path = require('path');
  const Gate = require(path.join(world.root, '/models/gateway/gateway.js')).model;

  const router = express.Router();

  router.get('/add-done-list/:ID', addDoneList);
  router.get('/remove-done-list/:ID', removeDoneList);

  module.exports = {
    addRouter(app) {
      app.use('/doneStat', router);
    }
  };

  /*******************************************
  Implementation
  *******************************************/

  function addDoneList(req, res, next) {
    const ID = req.params.ID;
    const redirect = req.query.redirect || '000000000000000000000000';
    const userID = req.session.userID;

    if (!req.session.isLoggedIn) {
      return world.handleError(req, res, 'Login required');
    }

    Gate.update({
      _id: ID
    }, {
      $addToSet: {
        doneList: userID
      }
    }, function(err) {
      if (err) return next(err);

      return res.redirect(`/gateway/getChildren/${redirect}`);
    });
  }

  function removeDoneList(req, res, next) {
    const ID = req.params.ID;
    const redirect = req.query.redirect || '000000000000000000000000';
    const userID = req.session.userID;

    if (!req.session.isLoggedIn) {
      return world.handleError(req, res, 'Login required');
    }

    Gate.update({
      _id: ID
    }, {
      $pull: {
        doneList: userID
      }
    }, function(err) {
      if (err) return next(err);

      return res.redirect(`/gateway/getChildren/${redirect}`);
    });
  }
}());
