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
  cursorForObjectInConnection,
  mutationWithClientMutationId,
} from 'graphql-relay';

import { UserError } from 'graphql-errors';

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
      resolve: async ({ project }) => ({
        cursor: cursorForObjectInConnection(await getAll(), project),
        node: project,
      }),
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
    project.save();

    return { project, user };
  },
});

export default {
  createProject: CreateProjectMutation,
};
