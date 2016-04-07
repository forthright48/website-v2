/*
Model for Psetting database.
*/

(function() {
    "use strict";

    var mongoose = require("mongoose");

    var schema = new mongoose.Schema({
        index: 'number',
        name: 'string',
        usedIn: 'string',
        link: "string"
    });

    var Psetting = mongoose.model("Psetting", schema);

    module.exports = Psetting;

}());
