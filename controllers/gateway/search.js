(function() {
    'use strict';

    var express = require ( "express");
    var world = require ( "forthright48/world");
    var path = require ( "path");
    var Gate = require( path.join ( world.root, "/models/gateway/gateway.js" ) ).model;

    var router = express.Router();

    router.get ( "/", getSearch );
    router.post ( "/", postSearch );

    module.exports = {
        addRouter: function ( app ) {
            app.use ( "/gateway/search", router );
        }
    };

    /*******************************************
    Implementation
    *******************************************/

    function getSearch ( req, res, next ) {
        return world.myRender ( req, res, "gateway/search", {
            msg: "Search a problem",
            state: "blank"
        });
    }

    function postSearch ( req, res, next ) {

        var platform = req.body.platform;
        var pid = req.body.pid;

        Gate.findOne ( {platform: platform, pid: pid}, function ( err, doc ) {
            if ( err ) return next ( err );

            if ( !doc ) return world.myRender ( req, res, "gateway/search", {
                msg: "No such problem, try again",
                state: 'not found'
            } );

            return world.myRender ( req, res, "gateway/search", {
                state: "found",
                parentId: doc.parentId
            });
        });

    }

}());
