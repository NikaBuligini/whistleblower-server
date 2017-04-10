import React from 'react';
import Relay from 'react-relay';
import DocumentTitle from 'react-document-title';
import Loading from '../../components/Loading';
import AddProjectComponent from '../../components/project/AddProjectComponent';
import List from '../../components/project/ProjectList';
import type { Project } from '../../actions/types';

type ProjectEdges = {
  edges: Array<{ node: Project }>,
}

type ProjectListProps = {
  admin: {
    projects: Array<ProjectEdges>,
  }
}

class ProjectList extends React.Component {
  componentDidMount() {
    console.log('cdm', this.props);
    this.props.relay.forceFetch();
  }

  props: ProjectListProps

  render() {
    const { projects } = this.props.admin;

    console.log(this.props);

    if (!projects) {
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
              <List data={projects.edges} />
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
    admin: () => Relay.QL`
      fragment on Admin {
        projects(first: $count) {
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
