/*
Controller for Problem-Creation app

App Root: /problem-creation
*/

(function(){
    "use strict";

    var express = require ( "express");
    var path = require ( 'path' );
    var Psetting = require ( path.join ( global.root, "/models/psetting/psetting.js" ) );

    var router = express.Router();

    router.get ( "/", renderRootView);

    module.exports = function ( app ) {
        app.use ( '/problem-creation', router );
    };

    /*******************************************************
    Implementation
    *******************************************************/
    function renderRootView ( req, res ) {
        Psetting.find ( {} ).sort ( "-index").exec( function ( err, data ) {
            if ( err ) {
                return res.render ( "error.hbs", {
                    subtitle: "error",
                    error: "Problem in getting data from Psetting database",
                    realError: err
                });
            }

            return res.render ( "problem-creation/problem-creation.hbs", {
                subtitle: "problem-creation",
                data: data
            });
        });
    }

}());
