(function() {
    'use strict';
    var express = require("express");
    var world = require("forthright48/world");
    var path = require ( "path");
    var User = require( path.join ( world.root, "/models/users/users.js" ) ).model;
    var bcrypt = require ( "bcryptjs" );

    var router = express.Router();

    router.get("/userList", userList );
    router.get("/activate-email", activateEmail );
    router.get("/edit-profile", editProfileGet );
    router.post("/edit-profile", editProfilePost );

    module.exports = {
        addRouter: function ( app ) {
            app.use ( "/users", router );
        }
    };

    /*******************************************
    Implementation
    *******************************************/

    function userList ( req, res, next ) {
        User.find({},function(err,arr){
            if ( err ) return next(err);
            return world.myRender(req,res,"users/userList", { data: arr });
        });
    }

    function editProfileGet ( req, res, next ) {
        if ( !req.session.isLoggedIn ) return world.handleError ( req, res, "Requires login" );

        User.findOne( {username:req.session.username}, function ( err, user ) {
            if ( err ) return next ( err );
            return world.myRender ( req, res, "users/edit-profile.pug", {
                username: user.username,
                email : user.email
            });
        });
    }

    function editProfilePost ( req, res, next ) {
        if ( !req.session.isLoggedIn ) return world.handleError ( req, res, "Requires login" );

        var username = req.session.username;
        var password = req.body.password;
        var email = req.body.email;

        User.findOne( {username:req.session.username}, function ( err, user ) {
            if ( err ) return next ( err );

            bcrypt.compare ( password, user.password, function ( err, success ) {
                if ( err ) return next(err);

                if ( !success ) return world.handleError ( req, res, "Password doesn't match" );

                /// Password matches. Edit the user
                user.email = email;
                user.activated = false;

                user.save ( function ( err ) {
                    if ( err ) return next ( err );
                    return world.myRender ( req, res, "success", {data: { msg: "Edit Complete"} } );
                });
                
            });
        });
    }

    function activateEmail ( req, res, next ) {
        if ( !req.session.isLoggedIn ) return world.handleError ( req, res, "Requires login" );

        User.findOne( {username:req.session.username}, function ( err, user ) {
            if ( err ) return next ( err );
            return world.myRender ( req, res, "users/activate-email.pug", {
                email : user.email
            });
        });
    }

}());
