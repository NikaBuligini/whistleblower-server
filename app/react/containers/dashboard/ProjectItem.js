// @flow

import React from 'react';
import { connect } from 'react-redux';
import ServiceItem from './ServiceItem';
import type { Project, Service } from '../../actions/types';
import { ProjectPropType, ServicePropType } from '../../propTypes';

type Props = {
  project: Project,
  services: Service[],
}

const ProjectItem = (props: Props) => {
  const { project, services } = props;
  return (
    <div>
      <h6>{project.name} ({project.services.length})</h6>
      <ul className="mdl-list">
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} />
        ))}
      </ul>
    </div>
  );
};

ProjectItem.propTypes = {
  project: ProjectPropType.isRequired,
  services: React.PropTypes.arrayOf(ServicePropType),
};

ProjectItem.defaultProps = {
  services: [],
};

function mapStateToProps(state, ownProps) {
  const { project } = ownProps;
  const services = project.services
    .map(id => state.entities.services[id])
    .filter(service => service.isActive);
  return { services };
}

export default connect(mapStateToProps, {})(ProjectItem);
