/*
Model for Users Database
*/

(function() {
    "use strict";

    var mongoose = require("mongoose");

    var schema = new mongoose.Schema({
        username: String,
        password: String,
        status: String,
        doneList: [mongoose.Schema.ObjectId]
    });

    var Users = mongoose.model ( "User", schema, "users2" );

    module.exports = {
        model: Users
    };

}());
