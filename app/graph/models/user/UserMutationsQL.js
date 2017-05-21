import { GraphQLNonNull, GraphQLString } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { authenticate } from './UserSchema';
import { UserType } from '../types';

const AuthenticationMutation = mutationWithClientMutationId({
  name: 'Authentication',
  description: 'Authenticate user using email and password',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    viewer: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: async ({ email, password }, req) => {
    const user = await authenticate(email, password);
    if (user) {
      const { session } = req;
      session.userId = user._id;
      session.save(err => console.error(err));
    }
    return { user };
  },
});

export default {
  addUser: {
    type: UserType,
    args: {
      email: {
        name: 'email',
        type: GraphQLString,
      },
    },
    resolve: () => ({}),
  },
  authenticate: AuthenticationMutation,
};
