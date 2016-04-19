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
    router.post ( "/login", loginPost );
    router.get ( "/login", loginGet );
    router.get ( "/logout", logout );

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
                return world.handleError ( res, "Registration problem", err );
            }

            return world.myRender ( req, res, "success", {
                title: "User created",
                data: {
                    username: req.body.username
                }
            });

        });
    }

    // Login User
    function loginPost ( req, res ) {

        User.findOne({ username: req.body.username }).exec( function ( err, user ){
            if ( err ) {
                return world.handleError ( res, "Login problem", err );
            }
            if ( !user ) {
                return world.handleError ( res, "No Such User" );
            }

            if ( req.body.password !== user.password ) {
                return world.handleError ( res, "Password doesn't match" );
            }

            //Sucessfully logged in. Create Session
            req.session.username = req.body.username;
            req.session.isLoggedIn = true;

            // TODO: User Session
            return world.myRender ( req, res, "success", {
                title: "Successfully logged In",
                data: {
                    username: req.session.username,
                }
            });

        });
    }

    function loginGet (req, res) {
        return world.myRender ( req, res, "users/login", {});

    }

    function logout ( req, res, next ) {
        req.session.destroy( function ( err ) {
            if ( err ) next(err);

            return world.myRender ( req, res, "success", {
                title: "Sucessfully logged out"
            });

        });
    }

}());
