// Controls everything related to login and registration

(function() {
    'use strict';

    var express = require ( "express");
    var bcrypt = require ( "bcryptjs" );
    var world = require ( "forthright48/world");
    var path = require ( "path");
    var User = require( path.join ( world.root, "/models/users/users.js" ) ).model;

    var router = express.Router();

    router.post ( "/register", register );
    router.post ( "/login", login );

    module.exports = {
        addRouter: function ( app ) {
            app.use ( "/users", router );
        }
    };

    /*******************************************
    Implementation
    *******************************************/


    // Create New User
    function register( req, res ) {
        // TODO: Validate unique username and send notification accordingly
        // TODO: Encrypt password

        User.create ({
            username: req.body.username,
            password: req.body.password
        }, function ( err, user ) {
            if ( err ) {
                return res.render ( "error", world.handleError ( "Registration problem", err ) );
            }

            return res.render ( "success", {
                subtitle: "sucess",
                title: "User Created",
                data: {
                    username: req.body.username
                }
            });

        });
    }

    // Login User
    function login ( req, res ) {

        User.findOne({ username: req.body.username }).exec( function ( err, user ){
            if ( err ) {
                return res.render ( "error", world.handleError ( "Login Problem", err ) );
            }
            if ( !user ) {
                return res.render ( "error", world.handleError ( "No Such User" ) );
            }

            if ( req.body.password !== user.password ) {
                return res.render ( "error", world.handleError ( "Password doesn't match" ) );
            }

            // TODO: User Session
            return res.render ( "success", {
                title: "Success",
            });
        });
    }

}());
