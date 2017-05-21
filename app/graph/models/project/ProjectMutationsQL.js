import { GraphQLString, GraphQLNonNull } from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import { UserError } from 'graphql-errors';
import _ from 'lodash';

import { UserType, UserEdgeType, ProjectType, ProjectEdgeType } from '../types';
import User from '../user/UserSchema';
import Project, {
  getById,
  getByName,
  getAll,
  getAllPermissions,
  removePermission,
} from './ProjectSchema';

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

const CreatePermissionMutation = mutationWithClientMutationId({
  name: 'CreatePermission',
  description: 'Create access permission for project',
  inputFields: {
    projectId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    userEdge: {
      type: new GraphQLNonNull(UserEdgeType),
      resolve: async ({ project, permission }) => {
        const all = await getAllPermissions(project._id);
        const index = _.findIndex(all, { _id: permission._id });
        return {
          cursor: offsetToCursor(index),
          node: all[index],
        };
      },
    },
    project: {
      type: new GraphQLNonNull(ProjectType),
      resolve: ({ project }) => project,
    },
    viewer: {
      type: new GraphQLNonNull(UserType),
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async ({ projectId, userId }, { session }) => {
    const { userId: authorizedId } = session;
    const user = authorizedId ? User.findById(authorizedId) : null;

    if (!user) throw new UserError('unauthorized');

    const { id: projectRealId } = fromGlobalId(projectId);

    const project = await getById(projectRealId);
    if (!project) throw new UserError('Invalid project Id');

    const { id: userRealId } = fromGlobalId(userId);

    const permission = await project.addPermission(() =>
      User.findById(userRealId),
    );

    return { project, user, permission };
  },
});

const DeletePermissionMutation = mutationWithClientMutationId({
  name: 'DeletePermission',
  description: 'Remove access permission for project',
  inputFields: {
    projectId: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    deletedPermissionId: { type: GraphQLString },
    project: {
      type: new GraphQLNonNull(ProjectType),
      resolve: ({ project }) => project,
    },
    viewer: {
      type: new GraphQLNonNull(UserType),
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async ({ projectId, userId }, { session }) => {
    const { userId: authorizedId } = session;
    const user = authorizedId ? User.findById(authorizedId) : null;

    if (!user) throw new UserError('unauthorized');

    const { id: projectRealId } = fromGlobalId(projectId);

    const project = await getById(projectRealId);
    if (!project) throw new UserError('Invalid project Id');

    const { id: userRealId } = fromGlobalId(userId);

    const updatedProject = await removePermission(projectRealId, userRealId);

    return { project: updatedProject, user, deletedPermissionId: userId };
  },
});

export default {
  createProject: CreateProjectMutation,
  createPermission: CreatePermissionMutation,
  deletePermission: DeletePermissionMutation,
};
