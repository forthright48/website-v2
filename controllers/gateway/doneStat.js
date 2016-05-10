(function() {
    'use strict';

    var express = require ( "express");
    var world = require ( "forthright48/world");
    var path = require ( "path");
    var Gate = require( path.join ( world.root, "/models/gateway/gateway.js" ) ).model;

    var router = express.Router();

    router.get( "/add-done-list/:ID", addDoneList );
    router.get( "/remove-done-list/:ID", removeDoneList );

    module.exports = {
        addRouter: function ( app ) {
            app.use ( "/doneStat", router );
        }
    };

    /*******************************************
    Implementation
    *******************************************/

    function addDoneList ( req, res, next ) {
        var ID = req.params.ID;
        var redirect = req.query.redirect || "000000000000000000000000";
        var userID = req.session.userID;

        if ( !req.session.isLoggedIn ) {
            return world.handleError ( req, res, "Login required" );
        }

        Gate.update({_id: ID}, {$addToSet: { doneList: userID }}, function ( err ) {
            if ( err ) return next(err);

            return res.redirect("/gateway/getChildren/" + redirect );
        });
    }

    function removeDoneList ( req, res, next ) {
        var ID = req.params.ID;
        var redirect = req.query.redirect || "000000000000000000000000";
        var userID = req.session.userID;

        if ( !req.session.isLoggedIn ) {
            return world.handleError ( req, res, "Login required" );
        }

        Gate.update({_id: ID}, {$pull: { doneList: userID }}, function ( err ) {
            if ( err ) return next(err);

            return res.redirect("/gateway/getChildren/" + redirect );
        });
    }

}());
