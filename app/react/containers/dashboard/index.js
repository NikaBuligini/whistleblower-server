// @flow

import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Layout from '../layouts/DefaultLayout';
import ProjectItem from './ProjectItem';
import { loadUserServices } from '../../actions';
import type { Project } from '../../actions/types';
import { ProjectPropType } from '../../propTypes';

type Props = {
  projects: Project[],
  loadUserServices: () => void,
}

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.loadUserServices();
  }

  Props: Props;

  render() {
    const { projects } = this.props;

    const projectItems = projects.map((project, index) => (
      <ProjectItem key={index} project={project} />
    ));

    return (
      <Layout>
        <DocumentTitle title="Dashboard">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
              {projectItems}
            </div>
          </div>
        </DocumentTitle>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  loadUserServices: React.PropTypes.func.isRequired,
  projects: React.PropTypes.arrayOf(ProjectPropType),
};

Dashboard.defaultProps = {
  projects: [],
};

function mapStateToProps(state) {
  const { id } = state.preloaded;
  const { projects } = state.entities;

  const userProjects = [];
  Object.keys(projects).forEach((key) => {
    const project = projects[key];
    if (project.users.indexOf(id) !== -1) {
      userProjects.push(project);
    }
  });

  return { projects: userProjects };
}

export default connect(mapStateToProps, {
  loadUserServices,
})(Dashboard);
