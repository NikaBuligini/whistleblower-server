import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  } from 'graphql';

import ServiceType from './ServiceTypeQL';
import { getById } from './ServiceSchema';

export default {
  services: {
    type: new GraphQLList(ServiceType),
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: getById,
  },
};
