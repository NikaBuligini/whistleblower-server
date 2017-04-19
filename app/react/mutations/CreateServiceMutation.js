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
    const { projectId, name, type } = this.props;
    return {
      projectId,
      name,
      type,
    };
  }

  getFatQuery() {
    console.log('getFatQuery');
    return Relay.QL`
      fragment on CreateProjectPayload {
        serviceEdge {
          node {
            id
            name
          }
        }
        viewer {
          id
          project(name: "eLoan") {
            services(first: 10) {
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
