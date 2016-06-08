// Basic DB Connection Setup
(function() {
  'use strict';

  const world = require('forthright48/world');
  const mongoose = require('mongoose');
  const secret = process.env.SECRET_TOKEN || world.secret.secret; ///Secret object
  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);

  /*******************************************
  MongoDB
  *******************************************/

  // Mongoose Connection Code
  mongoose.connection.on('open', function() /*ref*/ {
    console.log('Connected to mongo server.');
  });
  mongoose.connection.on('error', function(err) {
    console.log('Could not connect to mongo server!');
    console.log(err);
  });

  mongoose.connect(world.secret.db);

  module.exports = {

    // TODO: Expire session

    addSession(app) {
      app.use(session({
        secret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection
        })
      }));
    }
  };
}());
