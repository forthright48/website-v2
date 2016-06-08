(function() {
  'use strict';

  const express = require('express');
  const world = require('forthright48/world');
  const path = require('path');
  const Gate = require(path.join(world.root, '/models/gateway/gateway')).model;

  const router = express.Router();

  router.get('/:page', showAll);

  module.exports = {
    addRouter(app) {
      app.use('/gateway/showAll', router);
    }
  };

  /*******************************************
  Implementation
  *******************************************/

  function showAll(req, res, next) {
    const userID = req.session.userID;
    const page = req.params.page;

    //TODO: Allow users to select number of items seen per page
    const perPage = 50;

    Gate
      .find({
        type: 'Problem'
      })
      .limit(perPage)
      .skip(page * perPage)
      .exec(function(err, data) {
        if (err) return next(err);

        let doneList = [];

        if (req.session.isLoggedIn) {
          doneList = data
            .filter(function(item) {
              return item.doneList.indexOf(userID) !== -1;
            })
            .map(function(item) {
              return item._id.toString();
            });
        }

        return world.myRender(req, res, 'gateway/showAll', {
          data,
          doneList,
          page,
          perPage,
          offset: page * perPage
        });
      });
  }
}());
