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
  const filename = 'ojnames.js';
  const filepath = path.join(root, `./models/gateway/${filename}`);
  let testobject;

  describe(filename, function() {
    before(function(done) { ///Start the server
      app.set('port', 1234);
      server.listen(app.get('port'), function(err) {
        done(err);
      });
    });
    before(function() { ///Load the testobject
      testobject = require(filepath);
    });

    it('should be an object', function() {
      testobject.should.exist;
      (typeof testobject).should.equal('object');
      Array.isArray(testobject).should.be.false;
    });
    it('should contain a key named data', function() {
      testobject.hasOwnProperty('data').should.be.true;
    });
    it('should have a array in data field', function() {
      Array.isArray(testobject.data).should.be.true;
    });

    describe('data', function() {
      it('should be non-empty');
      it('should contain strings only');
    });


    after(function(done) {
      server.close(done);
    });
  });
}());
