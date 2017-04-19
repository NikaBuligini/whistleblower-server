import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  } from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import ServicePayloadType from './service/ServicePayloadTypeQL';

import User from './user/UserSchema';
import Project, {
  getProjectsByUserId,
  getProjectByName,
  getProjectServices,
  getAll as getAllProjects,
  getTotalCount as getProjectsTotalCount,
} from './project/ProjectSchema';
import Service, {
  getById as getServiceById,
} from './service/ServiceSchema';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    console.log(type, id);
    if (type === 'User') {
      return User.getById(id);
    } else if (type === 'Project') {
      return Project.getById(id);
    } else if (type === 'Service') {
      return getServiceById(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType;
    } else if (obj instanceof Project) {
      return ProjectType;
    } else if (obj instanceof Service) {
      return ServiceType;
    }
    return null;
  },
);

export { nodeInterface, nodeField };

/**
 * ServiceTypeQL
 */
const ServiceType = new GraphQLObjectType({
  name: 'Service',
  description: 'A service',
  fields: () => ({
    id: globalIdField('Service'),
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
    timeout: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    uuid: { type: GraphQLString },
    payload: {
      type: new GraphQLList(ServicePayloadType),
      resolve: service => service.payload,
    },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
});

const { connectionType: ServiceConnectionType, edgeType: ServiceEdgeType } = connectionDefinitions({
  name: 'Service',
  nodeType: ServiceType,
});

export { ServiceType, ServiceConnectionType, ServiceEdgeType };

/**
 * ProjectTypeQL
 */
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  description: 'A project',
  fields: () => ({
    id: globalIdField('Project'),
    name: { type: GraphQLString },
    uuid: { type: GraphQLString },
    services: {
      type: ServiceConnectionType,
      description: 'Services for project',
      args: connectionArgs,
      resolve: async (project, args) => connectionFromArray(await getProjectServices(project), args),
    },
    // users: {
    //   type: new GraphQLList(UserType),
    //   resolve: getProjectUsers,
    // },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
});

const { connectionType: ProjectConnectionType, edgeType: ProjectEdgeType } = connectionDefinitions({
  name: 'Project',
  nodeType: ProjectType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'Total count of projects',
      resolve: () => getProjectsTotalCount(),
    },
  }),
});

export { ProjectType, ProjectConnectionType, ProjectEdgeType };

/**
 * UserTypeQL
 */
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: globalIdField('User'),
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    roles: { type: new GraphQLList(GraphQLString) },
    last_login: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    projects: {
      type: ProjectConnectionType,
      description: 'Visible projects for user',
      args: connectionArgs,
      resolve: async (viewer, args) => connectionFromArray(await getProjectsByUserId(viewer.id), args),
    },
    allProjects: {
      type: ProjectConnectionType,
      description: 'List of projects for administrator',
      args: connectionArgs,
      resolve: async (viewer, args) => {
        if (viewer.roles.indexOf('admin') === -1) return null;
        return connectionFromArray(await getAllProjects(), args);
      },
    },
    project: {
      type: ProjectType,
      description: 'Single project',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: getProjectByName,
    },
  }),
  interfaces: [nodeInterface],
});

const { connectionType: UserConnectionType } = connectionDefinitions({ name: 'User', nodeType: UserType });

export { UserType, UserConnectionType };
