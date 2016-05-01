(function() {
    'use strict';
    var mongoose = require ( "mongoose" );
    var express = require ( "express" );

    var schema = new mongoose.Schema({
        type: { type: String, set: removeNullOrBlank }, ///Folder vs item
        parentId: { type: mongoose.Schema.ObjectId, set : removeNullOrBlank },
        ind: { type: Number, set : removeNullOrBlank },///To reorder items inside same folder
        name: { type: String, set : removeNullOrBlank },

        body: {type: String, set : removeNullOrBlank },/// Contains text body

        platform: { type: String, set : removeNullOrBlank },
        pid: { type: String, set : removeNullOrBlank },
        link: { type: String, set : removeNullOrBlank },/// Link for problem or text
        hint: { type: String, set : removeNullOrBlank } /// Shoud be removed slowly
    });

    var Gate = mongoose.model("Gateway", schema );

    module.exports = {
        model: Gate
    };

    /*******************************************
    Implementation
    *******************************************/

    function removeNullOrBlank ( data ) {
        if ( data === null || data === "" ) return undefined;
        return data;
    }

}());
