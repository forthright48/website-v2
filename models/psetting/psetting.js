/*
Model for Psetting database.
*/

(function() {
  'use strict';

  const mongoose = require('mongoose');

  const schema = new mongoose.Schema({
    index: 'number',
    name: 'string',
    usedIn: 'string',
    link: 'string'
  });

  const Psetting = mongoose.model('Psetting', schema);

  module.exports = {
    model: Psetting
  };
}());
