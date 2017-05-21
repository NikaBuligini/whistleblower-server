// @flow
/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import Relay from 'react-relay';
import DocumentTitle from 'react-document-title';
import ServicesComponent from '../../components/service/ServicesComponent';
import PermissionsComponent from '../../components/permission/PermissionsComponent';

type Project = {
  id: string,
  name: string,
  uuid: string,
  created_at: string,
};

const ProjectDetails = (props: Project) => {
  const { uuid, created_at } = props;
  const createdAt = new Date(created_at);
  return (
    <section style={{ padding: '12px 0' }}>
      <div>
        <span>{`Created at: ${createdAt.toLocaleDateString()}`}</span>
      </div>
      <div>
        <span>{`Key: ${uuid}`}</span>
      </div>
    </section>
  );
};

type ProjectComponentProps = {
  viewer: {
    project: Project,
  }
}

const ProjectComponent = ({ viewer }: ProjectComponentProps) => {
  const { project } = viewer;

  return (
    <DocumentTitle title={project.name}>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
          <section
            className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--4dp project-detailed"
          >
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">
                {project.name}
              </h2>
            </div>
            <div className="mdl-card__supporting-text">
              <ProjectDetails {...project} />
              <ServicesComponent project={project} viewer={viewer} />
              <PermissionsComponent project={project} viewer={viewer} />
            </div>
          </section>
        </div>
      </div>
    </DocumentTitle>
  );
};

export default Relay.createContainer(ProjectComponent, {
  initialVariables: {
    projectName: '',
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id
        project(name: $projectName) {
          id
          name
          uuid
          created_at
          ${ServicesComponent.getFragment('project')}
          ${PermissionsComponent.getFragment('project')}
        }
        allUsers {
          id
          fullname
        }
      }
    `,
  },
});
