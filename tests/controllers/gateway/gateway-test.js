(function() {
  'use strict';
  const world = require('forthright48/world');
  const should = require('chai').should();
  const root = world.root;
  const path = require('path');
  const rewire = require('rewire');
  const request = require('superagent');
  const sinon = require('sinon');

  const {
    server,
    app
  } = require(path.join(root, './server.js'));

  const baseurl = 'http://localhost:1234';
  const filename = 'gateway.js';
  const filepath = path.join(root, `./controllers/gateway/${filename}`);
  let testobject;

  describe(filename, function() {
    ///Start Server
    before(function(done) {
      app.set('port', 1234);
      server.listen(app.get('port'), function(err) {
        done(err);
      });
    });

    ///Load the file
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
      it('should throw error if user not logged in', function(done) {
        request
          .get(`${baseurl}/admin/gateway/insert/`)
          .send({})
          .end(function(err, res) {
            res.status.should.equal(403);
            done();
          });
      });
      it('should call world.myRender() function', sinon.test(function() {
        let stub = sinon.stub(world, 'myRender');
        const req = {
          params: {}
        };
        const res = {};
        stub.withArgs(req, res).returns();

        getInsert(req, res);
        stub.calledOnce.should.be.true;
        stub.restore();
      }));
      it('should throw error if context does not have ojnames defined for rendering');
    });

    after(function(done) {
      server.close(done);
    });
  });
}());
