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
    var adminRouter = express.Router();

    router.get ( "/", renderRootView);

    adminRouter.get ( "/insert", getInsert );
    adminRouter.post( "/insert", postInsert );
    adminRouter.get ( "/edit", getEdit );           ///Query _id
    adminRouter.post( "/edit", postEdit );          ///Query _id
    adminRouter.post( "/delete", deleteProblem );   ///Query _id

    module.exports = {
        addRouter: function ( app ) {
            app.use ( '/problem-creation', router );
            app.use ( "/admin/problem-creation", adminRouter );
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

    /*******************************************
    Admin Router
    *******************************************/
    function getInsert( req, res ) {
        return world.myRender ( req, res, "problem-creation/insert-problem" );
    }

    function postInsert (req, res ) {
        // TODO: Validate req.body

        var problem = new Psetting ( {
            index: req.body.index,
            name: req.body.name,
            usedIn: req.body.usedIn,
            link: req.body.link
        });

        problem.save( function ( err ) {
            if ( err ) return next(err);

            return world.myRender ( req, res, "success", { title: "Insertion Complete" } );
        });
    }

    function getEdit ( req, res ) {
        var ID = req.query._id;
        Psetting.findById ( ID, function( err, data ){
            if ( err ) return next ( err );
            return world.myRender ( req, res, "problem-creation/edit-problem", data );
        });
    }

    function postEdit ( req, res ) {
        var ID = req.query._id;

        Psetting.findById ( ID, function ( err, data ) {
            if ( err ) return next ( err );

            syncModel ( data, req.body );

            data.save ( function ( err ) {
                if ( err ) return next ( err );
                return res.redirect ( "/problem-creation" );
            });
        });
    }

    function deleteProblem ( req, res ) {
        var ID = req.query._id;
    }

    function syncModel ( res, data ) {
        res.index = data.index;
        res.name = data.name;
        res.usedIn = data.usedIn;
        res.link = data.link;

        return res;
    }

}());
