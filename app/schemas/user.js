'use strict'

const mongoose = require('mongoose');

// const bcrypt = require('bcrypt');
// const SALT_ROUNDS = 10;

// Create a new schema for our tweet data
var UserSchema = new mongoose.Schema({
  fullname: { type: String, require: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
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

  // if (!this.isModified('password')) return next();

  // bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
  //   if (err) return next(err);
  //
  //   // Store hash in your password DB.
  //   user.password = hash;
  //   next();
  // });
});

UserSchema.statics = {
  /**
   * Authenticate user
   *
   * @param {String} email
   * @param {String} password
   * @param {Function} fired after execution
   * @api private
   */
  authenticate (email, password, next) {
    return this.findOne({ email })
      .select('+password')
      .exec()
      .then((user) => {
        if (!user) return next();

        next(user);
        // bcrypt.compare(password, user.password, (err, res) => {
        //   next(err, res);
        // });
      })
  },

  /**
   * Get all projects
   * @api public
   */
  getAll () {
    return this.find({})
      .exec()
  }
}

// Return a User model based upon the defined schema
module.exports = mongoose.model('User', UserSchema);
