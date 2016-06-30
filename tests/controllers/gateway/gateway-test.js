(function() {
  'use strict';
  const world = require('forthright48/world');
  const should = require('chai').should();
  const root = world.root;
  const path = require('path');
  const rewire = require('rewire');
  const request = require('superagent');

  const {
    server,
    app
  } = require(path.join(root, './server.js'));

  const baseurl = 'http://localhost:1234';
  const filename = 'gateway.js';
  const filepath = path.join(root, `./controllers/gateway/${filename}`);
  let testobject;

  describe(filename, function() {
    before(function(done) {
      app.set('port', 1234);
      server.listen(app.get('port'), function(err) {
        done(err);
      });
    });
    before(function() {
      testobject = rewire(filepath);
    });

    describe('ojnames', function() {
      let ojnames;
      before(function() {
        ojnames = testobject.__get__('ojnames');
        ojnames.should.exist;
      });
      it('should be same as module from ./models/gateway/ojnames.js', function() {
        ojnames.should.be.equal(require(path.join(root, './models/gateway/ojnames.js')));
      });
      it('should have data field which should be an array of strings', function() {
        ojnames.should.have.ownProperty('data');
        ojnames.data.should.be.a('array');
        ojnames.data.forEach(function(val) {
          val.should.be.a('string');
        });
      });
    });

    describe('getInsert(req, res)', function() {
      let getInsert;
      before(function() {
        getInsert = testobject.__get__('getInsert');
        getInsert.should.exist;
      });
      it('should throw error if req.params.parentID is not defined', function(done) {
        request
          .get(`${baseurl}/gateway/insert/`)
          .send({})
          .end(function(err, res) {
            res.status.should.equal(404);
            done();
          });
      });
      it('should call world.myRender() function');
      it('should throw error if context does not have ojnames defined for rendering');
    });

    after(function(done) {
      server.close(done);
    });
  });
}());
