/* eslint-disable class-methods-use-this */

import Relay from 'react-relay';

class CreatePermissionMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        createPermission(input: $input)
      }
    `;
  }

  getVariables() {
    return {
      projectId: this.props.project.id,
      userId: this.props.user.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreatePermissionPayload {
        userEdge {
          node {
            id
            fullname
          }
        }
        project {
          users(first: 10) {
            edges {
              node {
                id
                fullname
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
      parentName: 'project',
      parentID: this.props.project.id,
      connectionName: 'users',
      edgeName: 'userEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default CreatePermissionMutation;
