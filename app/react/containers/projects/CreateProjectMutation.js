import Relay from 'react-relay';

class CreateProjectMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation { createProject(input: $input) }`;
  }

  getVariables() {
    console.log(this.props);
    return {
      name: this.props.name,
    };
  }

  getFatQuery() {
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
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        payload: this.props.name,
      },
    }];
  }
}

export default CreateProjectMutation;
