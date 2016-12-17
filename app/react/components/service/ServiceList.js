import React from 'react';
import { withRouter } from 'react-router';
import Loading from '../../components/Loading';
import ServiceItem from '../../components/service/ServiceItem';
import { ServicePropType } from '../../propTypes';

class ServicesList extends React.Component {
  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  render() {
    const { isFetching, services, handleActivationChange } = this.props;
    const { projectName } = this.props.params;

    if (isFetching) {
      return <Loading cls="loading" />;
    }

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

ServicesList.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  params: React.PropTypes.shape({
    projectName: React.PropTypes.string,
  }).isRequired,
  services: React.PropTypes.arrayOf(ServicePropType).isRequired,
  handleActivationChange: React.PropTypes.func.isRequired,
};

export default withRouter(ServicesList);
