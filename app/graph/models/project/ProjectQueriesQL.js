import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  } from 'graphql';

import ProjectType from './ProjectTypeQL';
import { getProjects } from './ProjectSchema';

const Viewer = new GraphQLObjectType({
  name: 'Viewer',
  description: 'A viewer',
  fields: () => ({
    id: { type: GraphQLID },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: getProjects,
    },
  }),
});

export default {
  projects: {
    type: new GraphQLList(ProjectType),
    args: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      userId: { type: GraphQLString },
    },
    resolve: getProjects,
  },
  viewer: {
    type: Viewer,
    resolve: () => ({}),
  },
};
