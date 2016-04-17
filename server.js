(function() {
    "use strict";

    var world = require( "forthright48/world");
    var express = require("express");
    var path = require("path");
    var hbs = require("hbs");
    var mongoose = require("mongoose");
    var secret = process.env.SECRET_TOKEN || world.secret.secret; ///Secret object
    var app = express();


    /*******************************************
    Configuration
    *******************************************/

    /*App*/
    app.set("superSecret", secret);
    app.set('port', process.env.PORT || 8080);
    app.use(express.static(path.join(__dirname, "/public"))); ///Configure the public folder

    /*HBS*/
    app.set('view engine', 'hbs'); ///Support for handlebars rendering
    app.set('views', __dirname + '/views');
    hbs.registerPartials(__dirname + '/views/partials');


    /*******************************************
    MongoDB
    *******************************************/

    // Mongoose Connection Code
    mongoose.connection.on('open', function(ref) {
        console.log('Connected to mongo server.');
    });
    mongoose.connection.on('error', function(err) {
        console.log('Could not connect to mongo server!');
        console.log(err);
    });

    mongoose.connect(process.env.MONGOLAB_URI || world.secret.db);

    /********************/


    app.get("/", function(req, res) {
        res.render("home.hbs", {
            subtitle: "home"
        });
    });

    require ( './controller/problem-creation/problem-creation.js')(app);

    app.get ( "/login", function ( req, res ) {
        res.render ( "users/login.hbs", {
            subtitle: "login"
        });
    });

    app.get ( "/*", function ( req, res ) {
        res.render ( "error", world.handleError( "404", "Page not found" ) );
    });

    app.listen(app.get("port"), function() {
        console.log(`Server running at port ${ app.get("port") }`);
    });

}());
