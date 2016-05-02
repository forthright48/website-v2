(function() {
    'use strict';
    var express = require ( "express" );
    var path = require ( "path" );
    var fs = require ( "fs" );
    var marked = require ( "marked" );
    var world = require ( "forthright48/world");

    var router = express.Router();

    router.get ( "/", function ( req, res ) {
        res.redirect ( "/cpps/notebook.md" );
    });

    router.get ( "/*", function ( req, res, next ) {
        var fileName = req.params[0];

        var filePath = path.join ( __dirname, "../../models/cpps", fileName );

        fs.readFile ( filePath, "utf8", function ( err, data ) {
            if ( err ) return next ( err );
            marked ( data, function ( err, content ) {
                if ( err ) return next ( err );
                return world.myRender( req, res, "cpps/cpps", { data: content } );
            });
        });

    });

    module.exports = {
        addRouter: function ( app ) {
            app.use ( "/cpps", router );
        }
    };

}());
