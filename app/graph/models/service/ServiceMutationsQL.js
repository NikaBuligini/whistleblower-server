import {
  // GraphQLObjectType,
  // GraphQLSchema,
  GraphQLString,
  // GraphQLInt,
  GraphQLNonNull,
  // GraphQLList,
  // GraphQLID,
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import { UserError } from 'graphql-errors';
import _ from 'lodash';

import { UserType, ServiceEdgeType } from '../types';
import User from '../user/UserSchema';
import Project from '../project/ProjectSchema';
import Service, { getByName, getAll } from './ServiceSchema';

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

    if (!user) {
      throw new UserError('unauthorized');
    }

    const project = Project.getById(projectId);
    if (!project) {
      return new UserError('project doesn\'t exists!');
    }

    const servicesWithSameName = project.services.filter(service => service.name === name);
    if (servicesWithSameName.length !== 0) {
      return new UserError(`${name} is already used!`);
    }

    const service = new Service({
      name,
      type,
    });
    await service.save();

    project.services.push(service);
    await project.save();

    return { service, project, user };
  },
});

export default {
  createService: CreateServiceMutation,
};
