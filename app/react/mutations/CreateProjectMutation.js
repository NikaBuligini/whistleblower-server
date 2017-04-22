/* eslint-disable class-methods-use-this */

import Relay from 'react-relay';

class CreateProjectMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        createProject(input: $input)
      }
    `;
  }

  getVariables() {
    return {
      name: this.props.name,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateProjectPayload {
        projectEdge {
          node {
            id
            name
            created_at
          }
        }
        viewer {
          id
          allProjects(first: 10) {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'allProjects',
      edgeName: 'projectEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default CreateProjectMutation;
