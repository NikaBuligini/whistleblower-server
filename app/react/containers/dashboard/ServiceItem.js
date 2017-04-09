// @flow

import React from 'react';
import Relay from 'react-relay';
import type { Service } from '../../actions/types';

const styles = {
  green: { color: '#4CAF50' },
  red: { color: 'rgb(244,67,54)' },
};

type Props = {
  service: Service,
}

const ServiceItem = (props: Props) => {
  const { service } = props;

  let icon = false;
  switch (service.status) {
    case 'ok':
      icon = <i className="material-icons mdl-list__item-icon" style={styles.green}>check</i>;
      break;
    case 'failed':
      icon = <i className="material-icons mdl-list__item-icon" style={styles.red}>close</i>;
      break;
    case 'outdated':
      icon = <i className="material-icons mdl-list__item-icon">schedule</i>;
      break;
    default:

  }

  return (
    <li className="mdl-list__item">
      <span className="mdl-list__item-primary-content">
        {icon}
        {service.name}
      </span>
    </li>
  );
};

export default Relay.createContainer(ServiceItem, {
  fragments: {
    service: () => Relay.QL`
      fragment on Service {
        name
        type
        status
        isActive
      }
    `,
  },
});
