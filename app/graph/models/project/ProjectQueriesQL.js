import {
  GraphQLList,
  GraphQLString,
  } from 'graphql';

import ProjectType from './ProjectTypeQL';
import { getProjects } from './ProjectSchema';

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
};
