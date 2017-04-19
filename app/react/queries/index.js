import Relay from 'react-relay';

export const ViewerQueries = {
  viewer: () => Relay.QL`
    query {
      viewer
    }
  `,
};

export const ProjectQuery = {
  viewer: (Component, vars) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('viewer', vars)}
      }
    }
  `,
};
