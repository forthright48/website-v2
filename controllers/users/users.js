(function() {
    'use strict';
    var express = require("express");
    var world = require("forthright48/world");
    var path = require ( "path");
    var User = require( path.join ( world.root, "/models/users/users.js" ) ).model;

    var router = express.Router();

    router.get("/userList", userList );

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

}());
