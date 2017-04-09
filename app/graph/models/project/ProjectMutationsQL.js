import {
  // GraphQLObjectType,
  // GraphQLSchema,
  GraphQLString,
  // GraphQLInt,
  // GraphQLNonNull,
  // GraphQLList,
  // GraphQLID,
  } from 'graphql';

import { ProjectType } from '../types';
// import Project from './ProjectSchema';

export default {
  createProject: {
    type: ProjectType,
    args: {
      type: {
        name: 'type',
        type: GraphQLString,
      },
    },
    resolve: () => ({}),
  },
};
