(function(){
    "use strict";

    var express = require ( "express" );
    var path = require ( "path");
    var app = express();

    var PORT = 8080;

    /*Configuration*/
    app.set('view engine', 'hbs'); ///Support for handlebars rendering
    app.use(express.static( path.join ( __dirname, "/public") ) ); ///Configure the public folder

    app.get ( "/", function( req, res ) {
        res.render ( "home.hbs" );
    });

    app.listen ( PORT, function() {
        console.log(`Server running at port ${ PORT }`);
    });

}());
