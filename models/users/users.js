/*
Model for Users Database
*/

(function() {
    "use strict";

    var mongoose = require("mongoose");

    var schema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: String, // Type of user [admin,User]
        doneList: [mongoose.Schema.ObjectId]
    });

    var Users = mongoose.model ( "User", schema, "users2" );

    module.exports = {
        model: Users
    };

}());
