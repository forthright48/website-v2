(function() {
    'use strict';
    var express = require('express');
    var world = require("forthright48/world");
    var path = require('path');
    var Gate = require(path.join(world.root, "/models/gateway/gateway")).model;

    var router = express.Router();

    router.get("/", function(req, res) {
        res.redirect("/gateway/getChildren/000000000000000000000000");
    });

    router.get("/getChildren/:parentID", function(req, res, next) {
        var parentID = req.params.parentID;

        ///Find all the documents whose parentId equals to parentID
        Gate.find({
            parentId: parentID
        }).sort({
            ind: 1
        }).exec(function(err, data ) {
            if (err) next(err);

            ///We also need the parentID document to create "Go Up" button
            Gate.findOne ( {
                _id: parentID
            }).exec ( function ( err, root ){
                if ( err ) next ( err );

                ///What if we are dealing with root directory that has no document
                root = root || {
                    name: 'root',
                    parentId: '000000000000000000000000'
                };

                return world.myRender(req, res, "gateway/gateway", {
                    root: root,
                    data: data
                });
            });
        });
    });

    module.exports = {
        addRouter: function(app) {
            app.use("/gateway", router);
        }
    };

}());
