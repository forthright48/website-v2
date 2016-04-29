(function() {
    'use strict';

    var express = require("express");
    var world = require("forthright48/world");

    var adminRouter = express.Router();

    adminRouter.get( "/toggleAdmin", toggleAdmin );

    module.exports = {
        addRouter: function ( app ) {
            app.use ( "/admin", adminRouter );
        }
    };

    /*******************************************
    Implementation
    *******************************************/

    // Route protected by admin
    function toggleAdmin ( req, res ) {
        req.session.adminMode = !req.session.adminMode;
        return world.myRender ( req, res, "success", { title: "Toggled" });
    }

}());
