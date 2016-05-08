(function() {
    'use strict';

    var express = require ( "express");
    var world = require ( "forthright48/world");
    var path = require ( "path");
    var User = require( path.join ( world.root, "/models/users/users.js" ) ).model;

    var router = express.Router();

    router.get( "/add-done-list/:ID", addDoneList );
    router.get( "/remove-done-list/:ID", removeDoneList );

    module.exports = {
        addRouter: function ( app ) {
            app.use ( "/user", router );
        }
    };

    /*******************************************
    Implementation
    *******************************************/

    function addDoneList ( req, res, next ) {
        var ID = req.params.ID;
        var redirect = req.query.redirect || "000000000000000000000000";

        if ( !req.session.isLoggedIn ) {
            return world.handleError ( req, res, "Login required" );
        }

        User.update({username: req.session.username}, {$addToSet: { doneList: ID }}, function ( err ) {
            if ( err ) return next(err);

            return res.redirect("/gateway/getChildren/" + redirect );
        });
    }

    function removeDoneList ( req, res, next ) {
        var ID = req.params.ID;
        var redirect = req.query.redirect || "000000000000000000000000";

        if ( !req.session.isLoggedIn ) {
            return world.handleError ( req, res, "Login required" );
        }

        User.update({username: req.session.username}, {$pull: { doneList: ID }}, function ( err ) {
            if ( err ) return next(err);

            return res.redirect("/gateway/getChildren/" + redirect );
        });
    }

}());
