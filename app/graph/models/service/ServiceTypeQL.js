import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  } from 'graphql';

// import Service from './ServiceSchema';

const ServicePayloadType = new GraphQLObjectType({
  name: 'Payload',
  description: 'Payload for service',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
});

export default new GraphQLObjectType({
  name: 'Service',
  description: 'A service',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
    timeout: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
    uuid: { type: GraphQLString },
    payload: {
      type: new GraphQLList(ServicePayloadType),
      resolve: service => service.payload,
    },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
