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
    const { services, handleActivationChange } = this.props;
    const { projectName } = this.props.params;

    console.log(services);

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
  params: React.PropTypes.shape({
    projectName: React.PropTypes.string,
  }).isRequired,
  services: React.PropTypes.arrayOf(ServicePropType).isRequired,
  handleActivationChange: React.PropTypes.func.isRequired,
};

export default withRouter(ServicesList);
