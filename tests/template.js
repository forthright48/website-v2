(function() {
  'use strict';
  const world = require('forthright48/world');
  const should = require('chai').should();
  const root = world.root;
  const path = require('path');

  const {
    server,
    app
  } = require(path.join(root, './server.js'));

  const baseurl = 'http://localhost:1234';

  describe('template', function() {
    before(function(done) {
      app.set('port', 1234);
      server.listen(app.get('port'), function(err) {
        done(err);
      });
    });

    after(function(done) {
      server.close(done);
    });
  });
}());
