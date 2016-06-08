/*Contains codes that is needed to change structure of app*/

(function() {
  'use strict';
  const express = require('express');
  const world = require('forthright48/world');
  const path = require('path');
  const Gate = require(path.join(world.root, '/models/gateway/gateway')).model;
  const async = require('async');
  const zeroRoot = '000000000000000000000000';

  const router = express.Router();

  router.get('/*', function(req, res, next) {
    if (req.session.username !== 'forthright48') {
      return world.handleError(req, res, 'You need to be forthright48');
    }

    next();
  });

  router.get('/calcAncestor', function(req, res) {
    return res.send('Too dangerous');
    /*calcAncestor(zeroRoot);

    return res.send('Done');*/
  });

  module.exports = {
    addRouter(app) {
      app.use('/forthright48', router);
    }
  };

  /*******************************************
  Implementation
  *******************************************/

  function calcAncestor(root) {
    let ancestor = [root];

    async.waterfall([
      ///Get ancestor of root
      function(callback) {
        if (root === zeroRoot) return callback(null); ///No ancestor
        else {
          Gate.findOne({
            _id: root
          }, function(err, data) {
            if (err) return callback(err);
            ancestor = data.ancestor;
            ancestor.push(root);
            return callback(null);
          });
        }
      },
      ///Calculate ancestor of all direct children of root.
      function(callback) {
        ///Find all documents whose parent is root
        Gate.find({
          parentId: root
        }, function(err, tdata) {
          if (err) return callback(err);

          const data = tdata || [];

          callback(null, data);
        });
      },

      ///For each member of arr, update their ancestor
      function(arr, callback) {
        async.forEachOf(arr, function(item, key, boom) {
          Gate.update({
            _id: item._id
          }, {
            $set: {
              ancestor
            }
          }, function(err) {
            if (err) return boom(err);
            console.log(`${item._id} is updated`);
            return boom(null);
          });
        }, function(err) {
          if (err) return callback(err);
          callback(null, arr);
        });
      }
    ], function(err, arr) {
      ///Every child of root is updated. Now we need to update each of the children.

      if (err) return err;

      for (let i = 0; i < arr.length; i++) {
        const x = calcAncestor(arr[i]._id);
        if (x) return x;
      }

      return null;
    });
  }
}());
