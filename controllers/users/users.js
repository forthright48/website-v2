(function() {
    'use strict';
    var express = require("express");
    var world = require("forthright48/world");
    var path = require ( "path");
    var User = require( path.join ( world.root, "/models/users/users.js" ) ).model;
    var bcrypt = require ( "bcryptjs" );
    var mailer = world.mailer;


    var router = express.Router();

    router.get("/userList", userList );
    router.get("/activate-account", activateAccout );
    router.get("/edit-profile", editProfileGet );
    router.post("/edit-profile", editProfilePost );
    router.get("/send-activation-link", sendActivationLink );
    router.get("/activate-account/:token", activateAccount );

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

                    ///Now that email has been changed, it needs to be activated again
                    req.session.needActivation = true;
                    return world.myRender ( req, res, "success", {data: { msg: "Edit Complete"} } );
                });

            });
        });
    }

    ///Handler for viewing activate email message
    function activateAccout ( req, res, next ) {
        if ( !req.session.isLoggedIn ) return world.handleError ( req, res, "Requires login" );

        User.findOne( {username:req.session.username}, function ( err, user ) {
            if ( err ) return next ( err );
            return world.myRender ( req, res, "users/activate-email.pug", {
                email : user.email
            });
        });
    }

    ///Handler for sending activation link
    function sendActivationLink ( req, res, next ) {
        if ( !req.session.isLoggedIn ) return world.handleError ( req, res, "Requires login" );

        if ( !req.session.needActivation ) return world.handleError ( req, res, "Email already activated" );

        ///Generate a token
        require('crypto').randomBytes(48, function(err, buffer) {
            if ( err ) return next ( err );

            var token = buffer.toString('hex');

            ///Send this token with mail
            var email = {
                to: [ req.session.email ],
                from: 'forthright48-no-reply@forthright48.com',
                subject: 'Account activation link',
                text: 'Here is your activation link: http://www.forthright48.com/users/activate-account/' + token,
                html: 'Here is your activation link: <a href="http://www.forthright48.com/users/activate-account/' + token +'">Activation Link </a>'
            };

            req.session.activationToken = token;

            mailer.sendMail ( email, function ( err, xyz ) {
                if ( err ) return next ( err );

                return world.myRender ( req, res, "success", {
                    data : {
                        message: "Activation link has been sent. Please check your mail. Do not logout of your accout. Logging out will expire your activation link."
                    }
                });
            });

        });
    }

    function activateAccount ( req, res, next ) {

        if ( !req.session.needActivation ) return world.handleError (req,res,"Activation link expired" );
        if ( !req.session.activationToken ) return world.handleError (req,res,"No activation link was sent to your mail" );
        var token = req.params.token;

        if ( token !== req.session.activationToken ) return world.handleError (req,res,"Activation token doesn't match" );

        ///Activate the account
        User.findOne( {username: req.session.username}, function(err,user){
            if ( err ) return next (err);

            user.activated = true;

            user.save ( function ( err ) {
                if ( err ) return next ( err );
                req.session.needActivation = false;
                return world.myRender ( req, res, "success", { title: "Activation Successful"});
            });
        });
    }

}());
