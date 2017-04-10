import {
  GraphQLObjectType,
  GraphQLString,
  } from 'graphql';

import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';

import { ProjectConnectionType } from './types';
import { UserSchema as User } from './schemas';
import { getAll } from './project/ProjectSchema';

/**
 * UserTypeQL
 */
const AdminUserType = new GraphQLObjectType({
  name: 'Admin',
  description: 'An admin',
  fields: () => ({
    id: globalIdField('User'),
    fullname: { type: GraphQLString },
    projects: {
      type: ProjectConnectionType,
      description: 'List of projects for administrator',
      args: connectionArgs,
      resolve: async (viewer, args) => connectionFromArray(await getAll(), args),
    },
  }),
});

export default {
  type: AdminUserType,
  resolve: async (parent, args, { session }) => {
    // return User.getById('58616b8d9fd38119f11a0dd6');
    const { userId } = session;

    const user = await User.getById(userId);
    if (user && user.roles.indexOf('admin') !== -1) {
      return user;
    }
    return null;
  },
};
