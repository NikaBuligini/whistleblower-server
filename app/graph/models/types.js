import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
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

import User, { getById as getUserById } from './user/UserSchema';
import Project, {
  getById as getProjectById,
  getProjectsByUserId,
  getProjectServices,
} from './project/ProjectSchema';
import Service, {
  getById as getServiceById,
} from './service/ServiceSchema';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'User') {
      return getUserById(id);
    } else if (type === 'Project') {
      return getProjectById(id);
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

const { connectionType: ServiceConnectionType } = connectionDefinitions({ name: 'Service', nodeType: ServiceType });

export { ServiceType, ServiceConnectionType };

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
    // services: {
    //   type: new GraphQLList(ServiceType),
    //   resolve: getProjectServices,
    // },
    // users: {
    //   type: new GraphQLList(UserType),
    //   resolve: getProjectUsers,
    // },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
});

const { connectionType: ProjectConnectionType } = connectionDefinitions({ name: 'Project', nodeType: ProjectType });

export { ProjectType, ProjectConnectionType };

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
  }),
  interfaces: [nodeInterface],
});

const { connectionType: UserConnectionType } = connectionDefinitions({ name: 'User', nodeType: UserType });

export { UserType, UserConnectionType };
