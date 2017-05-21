// @flow

import React from 'react';
import Relay from 'react-relay';
import DocumentTitle from 'react-document-title';
import Loading from '../../components/Loading';
import AddProjectComponent from '../../components/project/AddProjectComponent';
import ProjectCard from '../../components/project/ProjectCard';
import type { Project } from '../../actions/types';

type ProjectListProps = {
  viewer: {
    allProjects: Edges<Project>,
  },
};

class ProjectList extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  props: ProjectListProps;

  render() {
    const { allProjects } = this.props.viewer;

    if (!allProjects) {
      return <Loading />;
    }

    return (
      <DocumentTitle title="Projects">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
            <div className="projects">
              <AddProjectComponent viewer={this.props.viewer} />
              <div className="list">
                {allProjects.edges.map(({ node }) => (
                  <ProjectCard key={node.id} project={node} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Relay.createContainer(ProjectList, {
  initialVariables: { count: 10 },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id
        allProjects(first: $count) {
          edges {
            node {
              id
              name
              created_at
            }
          }
        }
      }
    `,
  },
});
