// @flow

import mongoose from 'mongoose';
import uuid from 'uuid';

type ProjectType = {
  name: string,
  uuid: string,
  services: Array<any>,
  users: Array<any>,
  created_at: Date,
  updated_at: Date,

  populate: (string) => ProjectType,
  exec: () => ProjectType,
};

type ProjectSchemaType = {
  pre: (string, (Function) => void) => void,
  methods: {
    addPermission: (Function) => any,
  },
  statics: {},
  find: ({}) => Array<ProjectType>,
  findById: (string) => ProjectType,
  findOne: ({}) => ProjectType,
  count: ({}) => number,
  populate: (ProjectType, string) => ProjectType,
  findByIdAndUpdate: (string, any, any) => ProjectType,
};

// Create a new schema for our tweet data
const ProjectSchema: ProjectSchemaType = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  uuid: { type: String, index: { unique: true } },
  services: [{ type: mongoose.Schema.ObjectId, ref: 'Service' }],
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

ProjectSchema.pre('save', function save(next: Function) {
  // get the current date
  const currentDate: Date = new Date();

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
  async addPermission(getPermissionUser) {
    const permission: { _id: string } = await getPermissionUser();
    if (this.users.indexOf(permission._id) === -1) {
      this.users.push(permission._id);
      this.save();
    }

    return permission;
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
  async removePermission(projectId: string, userId: string) {
    return this.findByIdAndUpdate(
      projectId,
      { $pull: { users: userId } },
      { safe: true, new: true },
    );
  },

  /**
   * Get project by name, populated with services
   * @param {name} project name
   * @api public
   */
  getProjectServices(name: string) {
    return this.findOne({ name })
      .populate('services')
      .populate('users')
      .exec();
  },
};

// Return a Project model based upon the defined schema
const Project: ProjectSchemaType = mongoose.model('Project', ProjectSchema);

/**
 * Get all projects
 * @api protected
 */
export function getAll() {
  return Project.find({});
}

/**
 * Get all perrmisions for project
 * @param {projectId} string
 * @api protected
 */
export function getAllPermissions(projectId: string) {
  return Project.findById(projectId)
    .populate('users')
    .exec();
}

/**
 * Get projects by id, name or userId
 * @param {id?} string
 * @param {name?} string
 * @param {userId?} string
 * @api public
 */
export function getProjects(_: {}, { id, name, userId }: { id: string, name: string, userId: string }) {
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
 * Get projects by name
 * @param {name} string
 * @api public
 */
export async function getProjectByName(_: {}, { name }: { name: string }) {
  return Project.findOne({ name });
}

/**
   * Get project services
   * @param {project} Project
   * @api public
   */
export async function getProjectServices(project: ProjectType) {
  const populated = await Project.populate(project, 'services');
  return populated.services;
}

/**
   * Get project users
   * @param {project} Project
   * @api public
   */
export async function getProjectUsers(project: ProjectType) {
  const populated = await Project.populate(project, 'users');
  return populated.users;
}

/**
   * Get visible projects for user
   * @param {userId} String
   * @api public
   */
export async function getProjectsByUserId(userId: string) {
  return Project.find({ users: userId });
}

/**
   * Get project by id
   * @param {id} String
   * @api public
   */
export function getById(id: string) {
  return Project.findById(id);
}

/**
   * Get project by name
   * @param {name} String
   * @api public
   */
export function getByName(name: string) {
  return Project.findOne({ name });
}

/**
   * Get total count of projects
   * @api public
   */
export function getTotalCount() {
  return Project.count({});
}

/**
   * Remove access permission on project
   * @param {projectId} string
   * @param {userId} string
   * @api protected
   */
export function removePermission(projectId: string, userId: string) {
  return Project.findByIdAndUpdate(
    projectId,
    { $pull: { users: userId } },
    { safe: true, new: true },
  );
}

export default Project;
