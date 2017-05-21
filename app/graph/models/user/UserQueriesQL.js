import { GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';

import { UserType } from '../types';
import { getAllUsers, getById } from './UserSchema';

export default {
  users: {
    type: new GraphQLList(UserType),
    description: 'Get all users',
    resolve: getAllUsers,
  },

  user: {
    type: UserType,
    description: 'Get single user by id',
    args: {
      id: {
        name: 'id',
        description: 'User id',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: getById,
  },
};
