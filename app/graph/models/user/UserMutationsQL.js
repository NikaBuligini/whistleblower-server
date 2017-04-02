import {
  // GraphQLObjectType,
  // GraphQLSchema,
  GraphQLString,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLList,
  // GraphQLID,
  } from 'graphql';

import UserType from './UserTypeQL';
// import User from './UserSchema';

export default {
  addUser: {
    type: UserType,
    args: {
      email: {
        name: 'email',
        type: GraphQLString,
      },
    },
    resolve: () => ({}),
  },
};
