/* eslint-disable class-methods-use-this */

import Relay from 'react-relay';

class CreateServiceMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        createService(input: $input)
      }
    `;
  }

  getVariables() {
    const { project, name, type } = this.props;
    return {
      projectId: project.id,
      name,
      type,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateServicePayload {
        serviceEdge {
          node {
            id
            name
          }
        }
        viewer {
          id
          project(name: "${this.props.project.name}") {
            services(first: 10) {
              edges {
                node {
                  id
                  name
                  isActive
                }
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
      connectionName: 'services',
      edgeName: 'serviceEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default CreateServiceMutation;
