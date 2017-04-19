// @flow

import React from 'react';
import Relay from 'react-relay';
// import { connect } from 'react-redux';
import ServiceItem from './ServiceItem';
import type { Project } from '../../actions/types';

type Props = {
  project: Project,
}

const ProjectItem = (props: Props) => {
  const { project } = props;
  return (
    <div>
      <h6>{project.name} ({project.services.edges.length})</h6>
      <ul className="mdl-list">
        {project.services.edges.map(({ node }) => (
          <ServiceItem key={node.id} service={node} />
        ))}
      </ul>
    </div>
  );
};

export default Relay.createContainer(ProjectItem, {
  fragments: {
    project: () => Relay.QL`
      fragment on Project {
        name
        uuid
        services(first: 10) {
          edges {
            node {
              id
              ${ServiceItem.getFragment('service')}
            }
          }
        }
      }
    `,
  },
});
