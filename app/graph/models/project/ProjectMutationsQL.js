import {
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import { UserError } from 'graphql-errors';
import _ from 'lodash';

import { UserType, ProjectEdgeType } from '../types';
import User from '../user/UserSchema';
import Project, { getByName, getAll } from './ProjectSchema';

const CreateProjectMutation = mutationWithClientMutationId({
  name: 'CreateProject',
  description: 'Create new project',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    projectEdge: {
      type: new GraphQLNonNull(ProjectEdgeType),
      resolve: async ({ project }) => {
        const all = await getAll();
        const index = _.findIndex(all, { _id: project._id });
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
  mutateAndGetPayload: async ({ name }, { session }) => {
    const { userId } = session;
    const user = userId ? User.findById(userId) : null;

    if (!user) {
      throw new UserError('unauthorized');
    }

    const existingProject = await getByName(name);
    if (existingProject) {
      throw new UserError(`${name} is already used!`);
    }

    const project = new Project({ name });
    await project.save();

    return { project, user };
  },
});

export default {
  createProject: CreateProjectMutation,
};
