const mongoose = require('mongoose');
const uuid = require('uuid');

// Create a new schema for our app data
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  is_active: { type: Boolean, default: false },
  uuid: { type: String, index: { unique: true } },
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

function save(next) {
  // get the current date
  const currentDate = new Date();

  if (!this.uuid) {
    this.uuid = uuid.v1();
  }

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
}

ServiceSchema.pre('save', save);

ServiceSchema.statics = {
  /**
   * Get first project
   *
   * @api private
   */
  getById(id) {
    return this.findById(id)
      .exec();
  },
};

// Return a Service model based upon the defined schema
module.exports = mongoose.model('Service', ServiceSchema);
