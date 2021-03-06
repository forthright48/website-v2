(function() {
  'use strict';
  const world = require('forthright48/world');
  const should = require('chai').should();
  const assert = require('chai').assert;
  const root = world.root;
  const path = require('path');
  const rewire = require('rewire');
  const request = require('superagent');
  const sinon = require('sinon');
  const _ = require('lodash');

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
      let ojnames;
      before(function() {
        getInsert = testobject.__get__('getInsert');
        getInsert.should.exist;
        ojnames = testobject.__get__('ojnames');
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

      it('should throw error if context of world.myRender() does not have ojnames defined for rendering', sinon.test(function() {
        const stub = sinon.stub(world, 'myRender');
        const req = {
          params: {}
        };
        const res = {};
        stub.withArgs(req, res).returnsArg(3);

        const test = getInsert(req, res);

        assert.property(test, 'ojnames', 'No property names ojnames in context for render');
        assert.isTrue(_.isEqual(test.ojnames, ojnames), 'does not match with ojnames variable in file');
      }));
    });

    after(function(done) {
      server.close(done);
    });
  });
}());
