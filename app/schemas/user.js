import mongoose from 'mongoose';

// const bcrypt = require('bcrypt');
// const SALT_ROUNDS = 10;

// Create a new schema for our tweet data
const UserSchema = new mongoose.Schema({
  fullname: { type: String, require: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  roles: [String],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

function save(next) {
  // get the current date
  const currentDate = new Date();

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
}

UserSchema.pre('save', save);

UserSchema.statics = {
  /**
   * Authenticate user
   *
   * @param {String} email
   * @param {String} password
   * @param {Function} fired after execution
   * @api private
   */
  authenticate(email, password, next) {
    return this.findOne({ email })
      .select('+password')
      .exec()
      .then((user) => {
        if (!user) return next();

        return next(user);
        // bcrypt.compare(password, user.password, (err, res) => {
        //   next(err, res);
        // });
      });
  },

  getById(id) {
    return this.findById(id)
      .populate('projects')
      .exec();
  },

  /**
   * Get all projects
   * @api public
   */
  getAll() {
    return this.find({})
      .exec();
  },
};

// Return a User model based upon the defined schema
module.exports = mongoose.model('User', UserSchema);
