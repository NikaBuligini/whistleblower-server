import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import { UserQueries, UserMutations } from './models/user/UserQL';
import { ProjectQueries, ProjectMutations } from './models/project/ProjectQL';
import { ServiceQueries, ServiceMutations } from './models/service/ServiceQL';
import viewer from './models/viewer';

const RootQuery = new GraphQLObjectType({
  name: 'Query',  // Return this type of object
  fields: () => ({
    users: UserQueries.users,
    user: UserQueries.user,
    projects: ProjectQueries.projects,
    services: ServiceQueries.services,
    viewer,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    authenticate: UserMutations.authenticate,
    createProject: ProjectMutations.createProject,
    createService: ServiceMutations.createService,
  }),
});

// const RootSubscription = new GraphQLObjectType({
//   name: 'Subscription',
//   fields: () => ({
//     messageAdded: ContactSubscriptions.messageAdded,
//   }),
// });


const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
  // subscription: RootSubscription,
});

export default schema;
