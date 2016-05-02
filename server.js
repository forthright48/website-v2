(function() {
    "use strict";

    var world = require("forthright48/world");
    var express = require("express");
    var path = require("path");
    var hbs = require("hbs");
    var mongoose = require("mongoose");
    var secret = world.secret.secret; ///Secret object
    var bodyParser = require('body-parser');
    var errorhandler = require('errorhandler');


    var app = express();


    /*******************************************
    Configuration
    *******************************************/

    /*App*/
    app.set('port', process.env.PORT || 8080);
    app.use(express.static(path.join(__dirname, "/public"))); ///Configure the public folder
    app.use(bodyParser.json()); // support json encoded bodies
    app.use(bodyParser.urlencoded({
        extended: true
    })); // support encoded bodies

    /*HBS*/
    app.set('view engine', 'hbs'); ///Support for handlebars rendering
    app.set('views', __dirname + '/views');
    hbs.registerPartials(__dirname + '/views/partials');
    require("forthright48/hbs-helpers");

    /*DB*/
    require ( "./models/db.js").addSession(app);

    /*Authentication*/
    app.get ( "/admin/*", function(req,res,next){
        if ( req && req.session ) {
            if ( req.session.status === 'root' ) return next();
        }
        return world.handleError ( req, res, "Access Denied!" );
    });

    /*Home*/
    app.get("/", function(req, res) {
        return world.myRender ( req, res, "home" );
    });

    /*Problem Creation*/
    require('./controllers/problem-creation/problem-creation.js').addRouter(app);

    /*User and Admin*/
    require('./controllers/users/login.js').addRouter(app);
    require('./controllers/users/admin.js').addRouter(app);

    /*Gateway*/
    require('./controllers/gateway/gateway.js').addRouter(app);

    /*CPPS*/
    require('./controllers/cpps/cpps.js').addRouter(app);

    app.listen(app.get("port"), function() {
        console.log(`Server running at port ${ app.get("port") }`);
    });

    app.get('/*', function createError(req, res, next) {
        return world.handleError ( req, res, "404 Page Not Found" );
    });

    app.use(errorhandler()); // Stack trace

}());
