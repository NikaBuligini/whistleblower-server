import mongoose from 'mongoose';
import uuid from 'uuid';

// Create a new schema for our tweet data
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  uuid: { type: String, index: { unique: true } },
  services: [{ type: mongoose.Schema.ObjectId, ref: 'Service' }],
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

ProjectSchema.pre('save', function save(next) {
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
});

ProjectSchema.methods = {
  /**
   * Adds permission for user
   * @param {user} user
   * @api protected
   */
  addPermission(user) {
    const userIds = this.users.map(u => u.id);
    if (userIds.indexOf(user.id) === -1) {
      this.users.push(user);
      this.save();
    }
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

  // deprecated
  getAll() {
    return this.find({})
      .exec();
  },

  // deprecated
  getByName(name) {
    return this.findOne({ name })
      .populate('services')
      .populate('users')
      .exec();
  },

  // deprecated
  getById(id) {
    return this.findById(id)
      .populate('services')
      .populate('users')
      .exec();
  },

  // deprecated
  getByUserId(userId) {
    return this.find({ users: userId })
      .populate('services')
      .exec();
  },

  /**
   * Adds permission for user
   * @param {userId} int
   * @api protected
   */
  async removePermission(projectId, userId) {
    const project = await this.findByIdAndUpdate(
      projectId,
      { $pull: { users: userId } },
      { safe: true, new: true },
    );

    return project;
  },

  /**
   * Get project by name, populated with services
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
const Project = mongoose.model('Project', ProjectSchema);

/**
 * Get all projects
 * @api protected
 */
export function getAll() {
  return Project.find({});
}

/**
 * Get projects by id, name or userId
 * @param {id?} string
 * @param {name?} string
 * @param {userId?} string
 * @api public
 */
export function getProjects(root, { id, name, userId }) {
  if (id) {
    return Project.findById(id);
  } else if (name) {
    return Project.find({ name });
  } else if (userId) {
    return Project.find({ users: userId });
  }

  return Project.find({});
}

/**
   * Get project services
   * @param {project} Project
   * @api public
   */
export async function getProjectServices(project) {
  const populated = await Project.populate(project, 'services');
  return populated.services;
}

/**
   * Get project users
   * @param {project} Project
   * @api public
   */
export async function getProjectUsers(project) {
  const populated = await Project.populate(project, 'users');
  return populated.users;
}

/**
   * Get visible projects for user
   * @param {userId} String
   * @api public
   */
export async function getProjectsByUserId(userId) {
  return Project.find({ users: userId });
}

/**
   * Get total count of projects
   * @api public
   */
export function getTotalCount() {
  return Project.count({ });
}

export default Project;
