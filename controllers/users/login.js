// Controls everything related to login and registration

(function() {
    'use strict';

    var express = require ( "express");
    var bcrypt = require ( "bcryptjs" );
    var world = require ( "forthright48/world");
    var path = require ( "path");
    var User = require( path.join ( world.root, "/models/users/users.js" ) ).model;

    var router = express.Router();

    router.get("/register", registerGet )
    router.post ( "/register", registerPost );
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

    function registerGet (req, res, next ) {
        return world.myRender ( req, res, "users/register", {});
    }

    // Create New User
    function registerPost( req, res, next ) {

        // Validate username contains letters and numbers only
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;

        /// In case some invalid strings bypasses JS validator on client side
        if ( !world.validate.username(username) ) return world.handleError(req,res,"Invalid username" );
        if ( !world.validate.email(email) ) return world.handleError(req,res,"Invalid email" );

        bcrypt.hash ( password, 10, function ( err, hash ) {
            User.create ({
                username: username,
                password: hash
            }, function ( err, user ) {
                if ( err ) {
                    if ( err.code == 11000 ) return world.handleError ( req, res, "Username already in use" );
                    else return world.handleError ( req, res, "Registration problem" );
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
                return world.handleError ( req, res, "Username not registered" );
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
