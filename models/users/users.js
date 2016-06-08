/*
Model for Users Database
*/

(function() {
  'use strict';

  const mongoose = require('mongoose');

  const schema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'user'
    }, // Type of user [admin,User]
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    activated: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  });

  const Users = mongoose.model('User', schema, 'users2');

  module.exports = {
    model: Users
  };
}());
