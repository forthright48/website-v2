(function() {
    'use strict';

    var express = require ( "express");
    var bcrypt = require ( "bcryptjs" );
    var world = require ( "forthright48/world");

    var router = express.Router();

    router.post ( "/register", register );

    module.exports = {
        addRouter: function ( app ) {
            app.use ( "/users", router );
        }
    };

    /*******************************************
    Implementation
    *******************************************/


    /*
        Create a new user
    */
    function register( req, res ) {
        console.log( req.body );

        res.render ( "success", {
            data: req.body
        });
    }

}());
