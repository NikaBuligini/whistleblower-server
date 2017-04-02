import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  } from 'graphql';

import { getProjectServices, getProjectUsers } from './ProjectSchema';
import ServiceType from '../service/ServiceTypeQL';
import UserType from '../user/UserTypeQL';

export default new GraphQLObjectType({
  name: 'Project',
  description: 'A project',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    uuid: { type: GraphQLString },
    services: {
      type: new GraphQLList(ServiceType),
      resolve: getProjectServices,
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: getProjectUsers,
    },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
