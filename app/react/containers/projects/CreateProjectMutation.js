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
    console.log('getConfigs', this.props);
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
