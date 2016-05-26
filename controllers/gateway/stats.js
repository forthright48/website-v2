(function() {
    'use strict';

    var express = require ( "express");
    var world = require ( "forthright48/world");
    var path = require ( "path");
    var Gate = require( path.join ( world.root, "/models/gateway/gateway.js" ) ).model;
    var async = require ( "async" );
    var moment = require ("moment");

    var router = express.Router();

    router.get ( "/", function( req, res, next ) {
        var duration = {};

        duration.now = moment();
        duration.month = moment().subtract( 1, "months").startOf("day").format();
        duration.week = moment().subtract( 1, "weeks").startOf("day").format();

        async.parallel({
            month: function ( call ) {
                Gate.where("createdAt").gte(duration.month).count( function ( err, cnt) {
                    if ( err ) return call ( err );
                    return call ( null, cnt );
                });
            },
            week: function ( call ) {
                Gate.where("createdAt").gte(duration.week).count( function ( err, cnt) {
                    if ( err ) return call ( err );
                    return call ( null, cnt );
                });
            }
        }, function ( err, result ) {
            if ( err ) return next ( err );
            return world.myRender ( req, res, "gateway/stats", result );
        });

    });

    module.exports = {
        addRouter : function ( app ) {
            app.use ( "/gatewayStats", router );
        }
    };
}());
