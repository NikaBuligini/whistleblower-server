import Relay from 'react-relay';

export const ViewerQueries = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
};

export const AdminQueries = {
  admin: () => Relay.QL`
    query {
      admin
    }
  `,
};
