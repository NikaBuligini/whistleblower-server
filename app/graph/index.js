import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { maskErrors } from 'graphql-errors';

import { UserQueries, UserMutations } from './models/user/UserQL';
import { ProjectQueries, ProjectMutations } from './models/project/ProjectQL';
import { ServiceQueries, ServiceMutations } from './models/service/ServiceQL';
import viewer from './models/viewer';
import { nodeField } from './models/types';

const RootQuery = new GraphQLObjectType({
  name: 'Query',  // Return this type of object
  fields: () => ({
    node: nodeField,
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
    changeServiceStatus: ServiceMutations.changeServiceStatus,
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

maskErrors(schema);

export default schema;
