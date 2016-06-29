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
      testobject.should.have.ownProperty('data');
    });
    it('should have a array in data field', function() {
      Array.isArray(testobject.data).should.be.true;
    });

    describe('data', function() {
      let data;
      const OJList = [
        'CF',
        'HR',
        'HDU',
        'LOJ',
        'POJ',
        'SPOJ',
        'Toph',
        'URAL',
        'UVa',
        'UVaLive',
        'ZOJ'
      ];
      before(function() {
        data = testobject.data;
        Array.isArray(data).should.be.true;
      });

      it('should be non-empty', function() {
        data.should.have.length.above(0);
      });
      it('should contain strings only', function() {
        data.forEach(function(val) {
          val.should.be.a('string');
        });
      });

      it('should have every value present in OJList', function() {
        data.forEach(function(val) {
          val.should.be.oneOf(OJList);
        })
      });

    });


    after(function(done) {
      server.close(done);
    });
  });
}());
