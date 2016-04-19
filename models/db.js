// Basic DB Connection Setup
(function() {
    'use strict';

    var world = require("forthright48/world");
    var mongoose = require("mongoose");
    var secret = process.env.SECRET_TOKEN || world.secret.secret; ///Secret object
    var session = require('express-session');
    var MongoStore = require('connect-mongo')(session);

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

    module.exports = {
        addSession: function(app) {
            app.use( session({
                secret: secret,
                resave: false,
                saveUninitialized: false,
                store: new MongoStore({
                    mongooseConnection: mongoose.connection
                })
            }));
        }
    };

}());
