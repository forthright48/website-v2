(function(){
    "use strict";

    var express = require ( "express" );
    var app = express();

    var PORT = 8080;

    /*Configuration*/
    app.set('view engine', 'hbs'); ///Support for handlebars rendering

    app.get ( "/", function( req, res ) {
        res.render ( "testing.hbs", { name: "Samiul" } );
    });

    app.listen ( PORT, function() {
        console.log(`Server running at port ${ PORT }`);
    });

}());
