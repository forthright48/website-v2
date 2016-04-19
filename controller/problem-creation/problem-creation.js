/*
Controller for Problem-Creation app

App Root: /problem-creation
*/

(function(){
    "use strict";

    var express = require ( "express");
    var path = require ( 'path' );
    var world = require ( "forthright48/world" );
    var Psetting = require ( path.join ( world.root, "/models/psetting/psetting.js" ) ).model;

    var router = express.Router();

    router.get ( "/", renderRootView);

    module.exports = {
        addRouter: function ( app ) {
            app.use ( '/problem-creation', router );
        }
    };

    /*******************************************************
    Implementation
    *******************************************************/
    function renderRootView ( req, res ) {
        Psetting.find ( {} ).sort ( "-index").exec( function ( err, data ) {
            if ( err ) {
                return world.handleError ( res, "Problem in getting data from Psetting database", err );
            }

            return world.myRender ( req, res, "problem-creation/problem-creation", {
                data: data
            });
        });
    }

}());
