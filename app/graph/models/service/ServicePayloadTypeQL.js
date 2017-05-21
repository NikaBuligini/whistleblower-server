import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

const ServicePayloadType = new GraphQLObjectType({
  name: 'Payload',
  description: 'Payload for service',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    data: { type: GraphQLString },
    created_at: { type: GraphQLString },
  }),
});

export default ServicePayloadType;
