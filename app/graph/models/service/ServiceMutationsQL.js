import {
  // GraphQLObjectType,
  // GraphQLSchema,
  GraphQLString,
  // GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  // GraphQLList,
  // GraphQLID,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import { UserError } from 'graphql-errors';
import _ from 'lodash';

import { UserType, ServiceType, ServiceEdgeType } from '../types';
import User from '../user/UserSchema';
import Project from '../project/ProjectSchema';
import Service, { getByName, getAll } from './ServiceSchema';

/** createService
  */
const CreateServiceMutation = mutationWithClientMutationId({
  name: 'CreateService',
  description: 'Create new service for project',
  inputFields: {
    projectId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    serviceEdge: {
      type: new GraphQLNonNull(ServiceEdgeType),
      resolve: async ({ service, project }) => {
        const all = await getAll(project._id);
        const index = _.findIndex(all, { _id: service._id });
        return {
          cursor: offsetToCursor(index),
          node: all[index],
        };
      },
    },
    viewer: {
      type: new GraphQLNonNull(UserType),
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async ({ projectId, name, type }, { session }) => {
    const { userId } = session;
    const user = userId ? User.findById(userId) : null;

    if (!user) throw new UserError('unauthorized');

    const { id: projectRealId } = fromGlobalId(projectId);

    const project = await Project.getById(projectRealId);
    if (!project) throw new UserError('project doesn\'t exists!');

    const servicesWithSameName = project.services.filter(service => service.name === name);
    if (servicesWithSameName.length !== 0) throw new UserError(`${name} is already used!`);

    const service = new Service({ name, type });
    await service.save();

    project.services.push(service);
    await project.save();

    return { service, project, user };
  },
});

const ChangeServiceStatusMutation = mutationWithClientMutationId({
  name: 'ChangeServiceStatus',
  description: 'Change status of service',
  inputFields: {
    serviceId: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  outputFields: {
    service: {
      type: new GraphQLNonNull(ServiceType),
      resolve: async ({ service }) => service,
    },
    viewer: {
      type: new GraphQLNonNull(UserType),
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async ({ serviceId, status }, { session }) => {
    const { userId } = session;
    const user = userId ? User.findById(userId) : null;

    if (!user) throw new UserError('unauthorized');

    const { id: serviceRealId } = fromGlobalId(serviceId);

    const service = await Service.getById(serviceRealId);
    if (!service) throw new UserError('Service doesn\'t exists!');

    service.isActive = status;
    await service.save();

    return { service, user };
  },
});

export default {
  createService: CreateServiceMutation,
  changeServiceStatus: ChangeServiceStatusMutation,
};
