'use strict'

const mongoose = require('mongoose');

// Create a new schema for our tweet data
var UserSchema = new mongoose.Schema({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

// Return a User model based upon the defined schema
module.exports = mongoose.model('User', UserSchema);
