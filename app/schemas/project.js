const mongoose = require('mongoose');
const uuid = require('uuid');

// Create a new schema for our tweet data
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  uuid: { type: String, index: { unique: true } },
  services: [{ type: mongoose.Schema.ObjectId, ref: 'Service' }],
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
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

ProjectSchema.pre('save', save);

ProjectSchema.methods = {
  /**
   * Adds permission for user
   *
   * @param user
   * @api private
   */
  addPermission(user) {
    const userIds = this.users.map(u => u.id);
    if (userIds.indexOf(user.id) === -1) {
      this.users.push(user);
      this.save();
    }
  },

  /**
   * Remove permission for user
   *
   * @param userId
   * @api private
   */
  removePermission(userId) {
    const uid = this.users.indexOf(userId);
    if (uid !== -1) this.users.splice(uid, 1);
    this.save();
  },
};

ProjectSchema.statics = {
  /**
   * Get first project
   *
   * @api private
   */
  getFirstProject() {
    return this.findOne({})
      .populate('services')
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

  /**
   * Get project by name
   *
   * @param {name} project name
   * @api public
   */
  getByName(name) {
    return this.findOne({ name })
      .populate('services')
      .populate('users')
      .exec();
  },

  /**
   * Get project by id
   *
   * @param {id} project id
   * @api public
   */
  getById(id) {
    return this.findById(id)
      .populate('services')
      .populate('users')
      .exec();
  },

  /**
   * Get project by name, populated with services
   *
   * @param {name} project name
   * @api public
   */
  getProjectServices(name) {
    return this.findOne({ name })
      .populate('services')
      .populate('users')
      .exec();
  },
};

// Return a Project model based upon the defined schema
module.exports = mongoose.model('Project', ProjectSchema);
