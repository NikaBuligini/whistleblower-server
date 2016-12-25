// @flow

import React from 'react';
import type { Service } from '../../actions/types';
import { ServicePropType } from '../../propTypes';

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
  console.log(service);
  return (
    <li className="mdl-list__item">
      <span className="mdl-list__item-primary-content">
        {icon}
        {service.name}
      </span>
    </li>
  );
};

ServiceItem.propTypes = {
  service: ServicePropType,
};

export default ServiceItem;
