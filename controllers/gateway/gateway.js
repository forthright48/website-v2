(function() {
    'use strict';
    var express = require('express');
    var world = require("forthright48/world");
    var path = require('path');
    var Gate = require(path.join(world.root, "/models/gateway/gateway")).model;
    var User = require(path.join(world.root, "/models/users/users")).model;
    var marked = require("marked");
    var async = require("async");

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
        var node = req.params.parentID;

        ///Parallelly calculate many values required for page rendering
        async.parallel({
            ///Grabs all children of node
            data: function( callback ) {
                ///Find all the documents whose parentId equals to parentID
                Gate.find({parentId: node}).sort({ind: 1}).exec(function(err, data) {
                    if (err) return callback ( err );

                    ///Calculate totalCount and userCount parallely
                    async.parallel([
                        ///Calculate totalCount
                        function ( ticktock ) {
                            async.forEachOf( data, function ( value, key, boom ){
                                if ( value.type === 'Problem' || value.type  === "Text" ) return boom ( null );

                                var id = value._id;

                                ///Find count of this id
                                Gate.count({ancestor:id,type: {$in: ["Problem", "Text"]} }, function(err,cnt){
                                    if ( err ) return boom ( err );
                                    value.totalCount = cnt;
                                    return boom ( null );
                                });

                            }, function ( err ){
                                if ( err ) return ticktock ( err );
                                return ticktock ( null );
                            });
                        }, function ( ticktock ) {
                            var userID = req.session.userID;

                            async.forEachOf( data, function ( value, key, boom ){
                                if ( value.type === 'Problem' || value.type  === "Text" ) return boom ( null );
                                var id = value._id;

                                ///User not logged in
                                if ( !userID ) {
                                    value.userCount = "--";
                                    return boom ( null );
                                }

                                ///Find count of items user solved
                                Gate.count({ancestor:id,type: {$in: ["Problem", "Text"]}, doneList: userID },function(err,cnt){
                                    if ( err ) return boom ( err );
                                    value.userCount = cnt;
                                    return boom ( null );
                                });

                            }, function ( err ){
                                if ( err ) return ticktock ( err );
                                return ticktock ( null );
                            });
                        }
                    ],function(err){
                        if ( err ) return callback ( err );
                        return callback ( null, data );
                    });
                });
            },
            rootCount: function ( callback ) {
                ///Total number of items in subtree of this node
                Gate.count ( { ancestor: node, type: {$in: ["Problem", "Text"]} }, function ( err, rootCount ) {
                    if ( err ) return callback ( err );
                    return callback ( null, rootCount );
                });
            },
            userCount: function ( callback ) {
                var userID = req.session.userID;
                if ( !userID ) return callback ( null, "--" );

                ///Find number of items marked by user under this node
                Gate.count ( { ancestor: node, type: {$in: ["Problem", "Text"]}, doneList: userID }, function ( err, userCount ) {
                    if ( err ) return callback ( err );
                    return callback ( null, userCount );
                });
            },
            root: function ( callback ) {
                ///We also need the parentID document to create "Go Up" button
                Gate.findOne({_id: node}).exec(function(err, root) {
                    if (err) return callback ( err );
                    root = root || {
                        name: 'root',
                        parentId: '000000000000000000000000',
                        _id: node
                    };
                    return callback ( null, root );
                });
            },
            doneList: function ( callback ) {
                ///Get done list from user
                if ( req.session.isLoggedIn ) {
                    User.findOne({ username: req.session.username}, function(err,user){
                        if ( err ) return callback ( err );
                        return callback ( null, user.doneList );
                    });
                }
                else {
                    return callback ( null, [] );
                }
            }
        },function( err, coll ){
            ///When all calls are complete, render the page
            if ( err ) return next ( err );

            coll.root.totalCount = coll.rootCount;
            coll.root.userCount = coll.userCount;

            return world.myRender(req, res, "gateway/gateway", {
                data: coll.data,
                root: coll.root,
                doneList: coll.doneList
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

        ///Calculate ancestor
        Gate.findOne( {_id:content.parentId}, function ( err, doc ) {
            if ( err ) return next ( err );
            doc = doc || { ancestor: [] }; ///Handle root

            var ancestor = doc.ancestor;
            ancestor.push( content.parentId );
            content.ancestor = ancestor;

            var newItem = new Gate(content);
            newItem.save(function(err, data) {
                if (err) return next(err);
                return res.redirect("/gateway/getChildren/" + data.parentId);
            });
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

            Gate.findOne ( {_id: data.parentId }, function ( err, doc ) {
                if ( err ) return next ( err );
                doc = doc || { ancestor: [] };
                var ancestor = doc.ancestor;
                ancestor.push ( data.parentId );

                data.ancestor = ancestor;

                data.save(function(err) {
                    if (err) return next(err);
                    return res.redirect("/gateway/getChildren/" + data.parentId);
                });
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
