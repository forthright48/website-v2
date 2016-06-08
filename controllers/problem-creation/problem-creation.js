/*
Controller for Problem-Creation app

App Root: /problem-creation
*/

(function() {
  'use strict';

  const express = require('express');
  const path = require('path');
  const world = require('forthright48/world');
  const Psetting = require(path.join(world.root, '/models/psetting/psetting.js')).model;

  const router = express.Router();
  const adminRouter = express.Router();

  router.get('/', renderRootView);

  adminRouter.get('/insert', getInsert);
  adminRouter.post('/insert', postInsert);
  adminRouter.get('/edit/:ID', getEdit);
  adminRouter.post('/edit/:ID', postEdit);
  adminRouter.post('/delete/:ID', deleteProblem);

  module.exports = {
    addRouter(app) {
      app.use('/problem-creation', router);
      app.use('/admin/problem-creation', adminRouter);
    }
  };

  /*******************************************************
  Implementation
  *******************************************************/
  function renderRootView(req, res) {
    Psetting.find({})
      .sort('-index')
      .exec(function(err, data) {
        if (err) {
          return world.handleError(req, res, 'Problem in getting data from Psetting database', err);
        }

        return world.myRender(req, res, 'problem-creation/problem-creation', {
          data
        });
      });
  }

  /*******************************************
  Admin Router
  *******************************************/
  function getInsert(req, res) {
    return world.myRender(req, res, 'problem-creation/insert-problem');
  }

  function postInsert(req, res, next) {
    // TODO: Validate req.body

    const problem = new Psetting({
      index: req.body.index,
      name: req.body.name,
      usedIn: req.body.usedIn,
      link: req.body.link
    });

    problem.save(function(err) {
      if (err) return next(err);

      return res.redirect('/problem-creation');
    });
  }

  function getEdit(req, res, next) {
    const ID = req.params.ID;
    Psetting.findById(ID, function(err, data) {
      if (err) return next(err);
      return world.myRender(req, res, 'problem-creation/edit-problem', data);
    });
  }

  function postEdit(req, res, next) {
    const ID = req.params.ID;

    Psetting.findById(ID, function(err, data) {
      if (err) return next(err);

      syncModel(data, req.body);

      data.save(function(err) {
        if (err) return next(err);
        return res.redirect('/problem-creation');
      });
    });
  }

  function deleteProblem(req, res, next) {
    const ID = req.params.ID;

    Psetting.findById(ID).remove(function(err) {
      if (err) return next(err);
      return res.redirect('/problem-creation');
    });
  }

  function syncModel(res, data) {
    res.index = data.index;
    res.name = data.name;
    res.usedIn = data.usedIn;
    res.link = data.link;

    return res;
  }
}());
