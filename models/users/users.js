/*
Model for Users Database
*/

(function() {
    "use strict";

    var mongoose = require("mongoose");

    var schema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: String, default: "user"} // Type of user [admin,User]
    });

    var Users = mongoose.model ( "User", schema, "users2" );

    module.exports = {
        model: Users
    };

}());
