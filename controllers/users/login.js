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
        // return world.handleError ( req, res, "Nice Try. But nope." );

        // TODO: Validate unique username and send notification accordingly
        var username = req.body.username;
        var password = req.body.password;

        bcrypt.hash ( password, 10, function ( err, hash ) {
            User.create ({
                username: username,
                password: hash
            }, function ( err, user ) {
                if ( err ) {
                    return world.handleError ( req, res, "Registration problem", err );
                }

                return world.myRender ( req, res, "success", {
                    title: "User created",
                    data: {
                        username: req.body.username
                    }
                });

            });
        });
    }

    // Login User
    function loginPost ( req, res, next ) {
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({ username: username }).exec( function ( err, user ){
            if ( err ) {
                return world.handleError ( req, res, "Login problem", err );
            }
            if ( !user ) {
                return world.handleError ( req, res, "No Such User" );
            }

            bcrypt.compare ( password, user.password, function ( err, success ) {
                if ( err ) return next ( err );

                if ( !success ) return world.handleError ( req, res, "Password doesn't match" );

                //Sucessfully logged in. Create Session
                req.session.userID = user._id;
                req.session.username = req.body.username;
                req.session.isLoggedIn = true;
                req.session.status = user.status;

                return world.myRender ( req, res, "success", {
                    title: "Successfully logged In",
                    data: {
                        username: req.session.username,
                    }
                });

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
