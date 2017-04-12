import React from 'react';
import Relay from 'react-relay';
import DocumentTitle from 'react-document-title';
import Loading from '../../components/Loading';
import AddProjectComponent from '../../components/project/AddProjectComponent';
import ProjectCard from '../../components/project/ProjectCard';
import type { Project } from '../../actions/types';

type ProjectEdges = {
  edges: Array<{ node: Project }>,
}

type ProjectListProps = {
  viewer: {
    allProjects: Array<ProjectEdges>,
  }
}

class ProjectList extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  props: ProjectListProps

  render() {
    const { allProjects } = this.props.viewer;

    if (!allProjects) {
      return <Loading />;
    }

    // if (isFetching && typeof projects !== 'undefined') {
    //   return <Loading />;
    // }

    return (
      <DocumentTitle title="Projects">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
            <div className="projects">
              {/* <AddProjectComponent /> */}
              <div className="list">
                {allProjects.edges.map(({ node }) => <ProjectCard key={node.id} project={node} />)}
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
