/* eslint-disable class-methods-use-this */

import Relay from 'react-relay';

class DeletePermissionMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        deletePermission(input: $input)
      }
    `;
  }

  getVariables() {
    return {
      projectId: this.props.project.id,
      userId: this.props.userId,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeletePermissionPayload {
        deletedPermissionId
        viewer {
          id
          project(name: "${this.props.project.name}") {
            users(first: 10) {
              edges {
                node {
                  id
                  fullname
                }
              }
            }
          }
          allUsers {
            id
            fullname
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'users',
      deletedIDFieldName: 'deletedPermissionId',
    }];
  }
}

export default DeletePermissionMutation;
