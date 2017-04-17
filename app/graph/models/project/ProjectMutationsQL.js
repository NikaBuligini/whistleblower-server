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
} from 'graphql-relay';

import { UserError } from 'graphql-errors';

import { UserType, ProjectType } from '../types';
import User from '../user/UserSchema';
import Project, { getByName } from './ProjectSchema';

const CreateProjectMutation = mutationWithClientMutationId({
  name: 'CreateProject',
  description: 'Create new project',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    payload: {
      type: ProjectType,
      resolve: ({ project }) => project,
    },
    viewer: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async ({ name }, { session }) => {
    const { userId } = session;
    console.log(session);
    const user = userId ? User.findById(userId) : null;

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
