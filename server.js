(function(){
    "use strict";

    var express = require ( "express" );
    var path = require ( "path");
    var hbs = require ( "hbs" );
    var app = express();

    var PORT = 8080;

    /***********************************************************
    Configuration
    ***********************************************************/
    /*App*/
    app.set('view engine', 'hbs'); ///Support for handlebars rendering
    app.set('views', __dirname + '/views');
    app.use(express.static( path.join ( __dirname, "/public") ) ); ///Configure the public folder

    /*HBS*/
    hbs.registerPartials(__dirname + '/views/partials');

    app.get ( "/", function( req, res ) {
        res.render ( "home.hbs" );
    });

    app.get ( "/problem-creation", function ( req, res ) {
        res.render ( "problem-creation/problem-creation.hbs");
    });

    app.listen ( PORT, function() {
        console.log(`Server running at port ${ PORT }`);
    });

}());
