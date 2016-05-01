(function() {
    'use strict';
    var mongoose = require ( "mongoose" );
    var express = require ( "express" );

    var schema = new mongoose.Schema({
        type: String, ///Folder vs item
        parentId: mongoose.Schema.ObjectId,
        ind: Number, ///To reorder items inside same folder
        name: String,

        body: String, /// Contains text body

        platform: String,
        pid: String,
        link: String, /// Link for problem or text
        hint: String, /// Shoud be removed slowly
    });

    var Gate = mongoose.model("Gateway", schema );

    module.exports = {
        model: Gate
    };

}());
