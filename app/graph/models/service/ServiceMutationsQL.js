import {
  // GraphQLObjectType,
  // GraphQLSchema,
  GraphQLString,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLList,
  // GraphQLID,
  } from 'graphql';

import ServiceType from './ServiceTypeQL';
// import Service from './ServiceSchema';

export default {
  createService: {
    type: ServiceType,
    args: {
      type: {
        name: 'type',
        type: GraphQLString,
      },
    },
    resolve: () => ({}),
  },
};
