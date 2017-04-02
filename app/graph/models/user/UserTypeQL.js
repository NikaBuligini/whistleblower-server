import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  } from 'graphql';

// import User from './UserSchema';
// import NewsType from '../news/NewsTypeQL';

export default new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    roles: { type: new GraphQLList(GraphQLString) },
    last_login: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  }),
});
