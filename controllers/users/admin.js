(function() {
  'use strict';

  const express = require('express');
  const world = require('forthright48/world');

  const adminRouter = express.Router();

  adminRouter.get('/toggleAdmin', toggleAdmin);

  module.exports = {
    addRouter(app) {
      app.use('/admin', adminRouter);
    }
  };

  /*******************************************
  Implementation
  *******************************************/

  // Route protected by admin
  function toggleAdmin(req, res) {
    req.session.adminMode = !req.session.adminMode;
    return world.myRender(req, res, 'success', {
      title: 'Toggled'
    });
  }
}());
