import React from 'react';
import { Link } from 'react-router';

type ServiceItemProps = {
  service: any,
  projectName: string,
  handleActivationChange: (any) => void,
}

const ServiceItem = ({ service, projectName, handleActivationChange }: ServiceItemProps) => {
  const btnData = service.isActive
    ? { name: 'Disable', cls: 'mdl-button mdl-js-button mdl-button--primary' }
    : { name: 'Enable', cls: 'mdl-button mdl-js-button mdl-button--accent' };
  const iconCls = service.isActive
    ? 'material-icons mdl-list__item-icon active'
    : 'material-icons mdl-list__item-icon';

  return (
    <li className="mdl-list__item">
      <span className="mdl-list__item-primary-content">
        <i className={iconCls}>work</i>
        <Link to={`/projects/${projectName}/${service.id}`} className="name">
          {service.name}
        </Link>
      </span>
      <span className="service-status">
        <button
          className={btnData.cls}
          onClick={() => handleActivationChange(service)}
        >
          {btnData.name}
        </button>
      </span>
    </li>
  );
};

export default ServiceItem;
