// @flow

import React from 'react';
import { withRouter } from 'react-router';
import ServiceItem from '../../components/service/ServiceItem';

type ServicesListProps = {
  params: {
    projectName: string,
  },
  services: Array<any>,
  handleActivationChange: () => void,
}

class ServicesList extends React.Component {
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  props: ServicesListProps

  render() {
    const { services, handleActivationChange } = this.props;
    const { projectName } = this.props.params;

    if (services.length === 0) {
      return <span className="no-data">No services</span>;
    }

    return (
      <ul className="list mdl-list">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            service={service}
            projectName={projectName}
            handleActivationChange={handleActivationChange}
          />
        ))}
      </ul>
    );
  }
}

export default withRouter(ServicesList);
