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

import { ProjectType } from '../types';
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
  },
  mutateAndGetPayload: async ({ name }) => {
    const existingProject = await getByName(name);
    if (existingProject) {
      throw new UserError(`${name} is already used!`);
    }

    const project = new Project({ name });
    project.save();

    return { project };
  },
});

export default {
  createProject: CreateProjectMutation,
};
