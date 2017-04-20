import Relay from 'react-relay';

class CreateServiceMutation extends Relay.Mutation {
  getMutation() {
    console.log('getMutation', this.props);
    return Relay.QL`
      mutation {
        createService(input: $input)
      }
    `;
  }

  getVariables() {
    console.log('getVariables', this.props);
    const { project, name, type } = this.props;
    return {
      projectId: project.id,
      name,
      type,
    };
  }

  getFatQuery() {
    console.log('getFatQuery');
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
    console.log('getConfigs', this.props);
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
