(function() {
    'use strict';
    var express = require('express');
    var world = require("forthright48/world");
    var path = require('path');
    var Gate = require(path.join(world.root, "/models/gateway/gateway")).model;
    var marked = require("marked");

    var router = express.Router();
    var adminRouter = express.Router();

    router.get("/", function(req, res) {
        res.redirect("/gateway/getChildren/000000000000000000000000");
    });

    router.get("/getChildren/:parentID", getChildren);
    router.get("/read/:ID", read);
    router.get("/hint/:ID", hint);

    adminRouter.get("/insert/:parentID", getInsert);
    adminRouter.post("/insert", postInsert);
    adminRouter.get("/edit/:ID", getEditItem);
    adminRouter.post("/edit/:ID", postEditItem);
    adminRouter.post("/delete/:ID", deleteItem);

    module.exports = {
        addRouter: function(app) {
            app.use("/gateway", router);
            app.use("/admin/gateway", adminRouter);
        }
    };

    /*******************************************
    Implementation
    *******************************************/

    function getChildren(req, res, next) {
        var parentID = req.params.parentID;

        ///Find all the documents whose parentId equals to parentID
        Gate.find({
            parentId: parentID
        }).sort({
            ind: 1
        }).exec(function(err, data) {
            if (err) return next(err);

            ///We also need the parentID document to create "Go Up" button
            Gate.findOne({
                _id: parentID
            }).exec(function(err, root) {
                if (err) next(err);

                ///What if we are dealing with root directory that has no document
                root = root || {
                    name: 'root',
                    parentId: '000000000000000000000000',
                    _id: parentID
                };

                return world.myRender(req, res, "gateway/gateway", {
                    root: root,
                    data: data
                });
            });
        });
    }

    function read(req, res, next) {
        var ID = req.params.ID;

        Gate.findOne({
            _id: ID
        }).exec(function(err, data) {
            if (err) return next(err);

            marked(data.body, function(err, content) {
                if (err) return next(err);
                data.body = content;
                return world.myRender(req, res, "gateway/read", {
                    data: data
                });
            });
        });
    }

    function hint(req, res, next) {
        var ID = req.params.ID;

        Gate.findOne({
            _id: ID
        }).exec(function(err, data) {
            if (err) return next(err);

            marked(data.hint, function(err, content) {
                if (err) return next(err);
                data.body = content;
                return world.myRender(req, res, "gateway/read", {
                    data: data
                });
            });
        });
    }

    /*******************************************
    Admin Router
    *******************************************/

    function getInsert(req, res, next) {
        var parentId = req.params.parentID;
        return world.myRender(req, res, "gateway/insert", {
            parentId: parentId
        });
    }

    function postInsert(req, res, next) {
        var content = {};
        syncModel(content, req.body);
        var newItem = new Gate(content);
        newItem.save(function(err, data) {
            if (err) return next(err);
            return res.redirect("/gateway/getChildren/" + data.parentId);
        });
    }

    function getEditItem(req, res, next) {
        var ID = req.params.ID;
        Gate.findById(ID, function(err, data) {
            if (err) return next(err);
            return world.myRender(req, res, "gateway/edit-item", data);
        });
    }

    function postEditItem(req, res, next) {
        var ID = req.params.ID;
        Gate.findById(ID, function(err, data) {
            if (err) return next(err);
            syncModel(data, req.body);

            data.save(function(err) {
                if (err) return next(err);
                return res.redirect("/gateway/getChildren/" + data.parentId);
            });
        });
    }

    function deleteItem(req, res, next) {
        var ID = req.params.ID;
        Gate.findById(ID, function ( err, data) {
            if ( err ) return next ( err );

            var parentId = data.parentId;

            data.remove ( function ( err ) {
                if ( err ) return next ( err );
                return res.redirect ( "/gateway/getChildren/" + parentId );
            });
        });
    }

    ///res is mutated
    function syncModel(res, data) {
        res.type = data.type;
        res.parentId = data.parentId;
        res.ind = data.ind;
        res.name = data.name;
        res.body = data.body;
        res.platform = data.platform;
        res.pid = data.pid;
        res.link = data.link;
        res.hint = data.hint;
    }
}());
