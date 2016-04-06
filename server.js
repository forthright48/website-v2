(function(){
    "use strict";

    var express = require ( "express" );
    var app = express();

    var PORT = 8080;

    app.get ( "/", function( req, res ) {
        res.send ( "Hello World" );
    });

    app.listen ( PORT, function() {
        console.log(`Server running at port ${ PORT }`);
    });

}());
