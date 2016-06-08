(function() {
  'use strict';
  const mongoose = require('mongoose');

  const schema = new mongoose.Schema({

    ///Folder vs item
    type: {
      type: String,
      set: removeNullOrBlank
    },
    parentId: {
      type: mongoose.Schema.ObjectId,
      set: removeNullOrBlank
    },
    ancestor: [mongoose.Schema.ObjectId],

    ///To reorder items inside same folder
    ind: {
      type: Number,
      set: removeNullOrBlank
    },
    name: {
      type: String,
      set: removeNullOrBlank,
      trim: true
    },

    /// Contains text body
    body: {
      type: String,
      set: removeNullOrBlank,
      trim: true
    },

    platform: {
      type: String,
      set: removeNullOrBlank
    },
    pid: {
      type: String,
      set: removeNullOrBlank
    },

    /// Link for problem or text
    link: {
      type: String,
      set: removeNullOrBlank,
      trim: true
    },
    hint: {
      type: String,
      set: removeNullOrBlank,
      trim: true
    },

    doneList: [mongoose.Schema.ObjectId] ///Stores the userID who solved the problem
  }, {
    timestamps: true
  });

  const Gate = mongoose.model('Gateway', schema);

  module.exports = {
    model: Gate
  };

  /*******************************************
  Implementation
  *******************************************/

  function removeNullOrBlank(data) {
    if (data === null || data === '') return undefined;
    return data;
  }
}());
