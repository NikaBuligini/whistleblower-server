import Relay from 'react-relay';

class CreateProjectMutation extends Relay.Mutation {
  getMutation() {
    console.log('getMutation', this.props);
    return Relay.QL`mutation { createProject(input: $input) }`;
  }

  getVariables() {
    console.log('getVariables', this.props);
    return {
      name: this.props.name,
    };
  }

  getFatQuery() {
    console.log('getFatQuery');
    return Relay.QL`
      fragment on CreateProjectPayload {
        payload {
          id
          name
          created_at
        }
      }
    `;
  }

  getConfigs() {
    console.log('getConfigs', this.props);
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.viewer.id,
      connectionName: 'allProjects',
      edgeName: 'edge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default CreateProjectMutation;
