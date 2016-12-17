import React from 'react';
import { Link } from 'react-router';
import { ServicePropType } from '../../propTypes';

class ServiceItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleActivationStatusChange = this.handleActivationStatusChange.bind(this);
  }

  handleActivationStatusChange() {
    this.props.handleActivationChange(this.props.service);
  }

  render() {
    const { service, projectName } = this.props;

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
            onClick={this.handleActivationStatusChange}
          >
            {btnData.name}
          </button>
        </span>
      </li>
    );
  }
}

ServiceItem.propTypes = {
  service: ServicePropType.isRequired,
  projectName: React.PropTypes.string.isRequired,
  handleActivationChange: React.PropTypes.func.isRequired,
};

export default ServiceItem;
