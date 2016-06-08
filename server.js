(function() {
  'use strict';

  const world = require('forthright48/world');
  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser');
  const errorhandler = require('errorhandler');

  const app = express();

  /*******************************************
  Configuration
  *******************************************/

  /*App*/
  app.set('port', process.env.PORT || 8080);
  app.use(express.static(path.join(__dirname, '/public'))); ///Configure the public folder
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({
    extended: true
  })); // support encoded bodies

  /*Pug*/
  app.set('view engine', 'pug'); ///Support for handlebars rendering
  app.set('views', `${__dirname}/views`);


  /*DB*/
  require('./models/db.js').addSession(app);

  /*Root Authentication*/
  app.get('/admin/*', function(req, res, next) {
    if (req && req.session) {
      if (req.session.status === 'root') return next();
    }
    return world.handleError(req, res, 'Access Denied!');
  });

  /*Middleware to force Email Activation*/
  app.get('/*', function(req, res, next) {
    ///Don't stop activation link
    if (req.url.indexOf('/users/activate-account') === 0) return next();

    if (req.url !== '/users/logout' && req.url !== '/users/send-activation-link' &&
      req.url !== '/users/edit-profile' && req.url !== '/users/activate-account' &&
      req.session.needActivation) return res.redirect('/users/activate-account');
    return next();
  });

  /*Home*/
  app.get('/', function(req, res) {
    return world.myRender(req, res, 'home');
  });

  /*Problem Creation*/
  require('./controllers/problem-creation/problem-creation.js').addRouter(app);

  /*User and Admin*/
  require('./controllers/users/login.js').addRouter(app);
  require('./controllers/users/admin.js').addRouter(app);
  require('./controllers/users/users.js').addRouter(app);

  /*Gateway*/
  require('./controllers/gateway/gateway.js').addRouter(app);
  require('./controllers/gateway/doneStat.js').addRouter(app);
  require('./controllers/gateway/stats.js').addRouter(app);
  require('./controllers/gateway/search.js').addRouter(app);
  require('./controllers/gateway/showAll.js').addRouter(app);

  /*CPPS*/
  require('./controllers/cpps/cpps.js').addRouter(app);

  /*Misc*/
  require('./controllers/misc/dbdesign').addRouter(app);

  app.listen(app.get('port'), function() {
    console.log(`Server running at port ${ app.get('port') }`);
  });

  app.get('/*', function createError(req, res) {
    return world.handleError(req, res, '404 Page Not Found');
  });

  app.use(errorhandler()); // Stack trace
}());
