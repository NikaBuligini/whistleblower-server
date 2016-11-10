'use strict'

const mongoose = require('mongoose');
const uuid = require('uuid');

// Create a new schema for our tweet data
var ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  uuid: { type: String, index: { unique: true } },
  services: [{ type: mongoose.Schema.ObjectId, ref: 'Service' }],
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
});

ProjectSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date();

  if (!this.uuid) {
    this.uuid = uuid.v1();
  }

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

ProjectSchema.statics = {
  /**
   * Get first project
   *
   * @api private
   */
  getFirstProject: function () {
    return this.findOne({})
      .populate('services')
      .exec()
  },

  /**
   * Get all projects
   */
  getAll: function () {
    return this.find({})
      .exec()
  },

  /**
   * Get project by id
   *
   * @param {projectName} project name
   * @api public
   */
  getProject: function (projectName) {
    return this.findOne({ 'name': projectName })
      .populate('services')
      .exec()
  }
}

// Return a Project model based upon the defined schema
module.exports = mongoose.model('Project', ProjectSchema);