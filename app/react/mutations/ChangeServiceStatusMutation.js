/* eslint-disable class-methods-use-this */

import Relay from 'react-relay';

class ChangeServiceStatusMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        changeServiceStatus(input: $input)
      }
    `;
  }

  getVariables() {
    const { service } = this.props;
    return {
      serviceId: service.id,
      status: !service.isActive,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on ChangeServiceStatusPayload {
        service {
          isActive
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        service: this.props.service.id,
      },
    }];
  }
}

export default ChangeServiceStatusMutation;
