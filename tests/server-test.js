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

  const request = require('superagent');
  const baseurl = 'http://localhost:1234';

  describe('server.js', function() {
    before(function(done) {
      app.set('port', 1234);
      server.listen(app.get('port'), function(err) {
        done(err);
      });
    });

    it('should be running on port 4801', function() {
      app.get('port').should.equal(1234);
    });

    it('should be using pug as view engine', function() {
      app.get('view engine').should.equal('pug');
    });

    it('should be using /views as render folder', function() {
      app.get('views').should.equal(`${root}/views`);
    });

    it('should have /public as public directory', function(done) {
      request
        .get(`${baseurl}/public/test.txt`)
        .end(function(err, res) {
          if (err) done(err);
          res.text.should.equal('working\n');
          done();
        });
    });

    after(function(done) {
      server.close(done);
    });
  });
}());
