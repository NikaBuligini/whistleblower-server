// @flow

import React from 'react';
import Relay from 'react-relay';
// import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Layout from '../layouts/DefaultLayout';
import ProjectItem from './ProjectItem';
// import { loadUserServices } from '../../actions';
import type { Project } from '../../actions/types';
import { ProjectPropType } from '../../propTypes';

type ProjectEdge = {
  node: {
    id: string,
    name: string,
  }
}

type Viewer = {
  projects: {
    edges: Array<ProjectEdge>,
  },
}

type Props = {
  viewer: Viewer,
  projects: Project[],
  // loadUserServices: () => void,
}

type DefaultProps = {
  projects: Project[],
}

class Dashboard extends React.Component {
  static defaultProps: DefaultProps;

  static propTypes = {
    // loadUserServices: React.PropTypes.func.isRequired,
    projects: React.PropTypes.arrayOf(ProjectPropType),
  }

  static defaultProps = {
    projects: [],
  }

  // componentDidMount() {
  //   this.props.loadUserServices();
  // }

  Props: Props;

  render() {
    const { projects } = this.props.viewer;
    console.log(projects);

    const projectItems = projects.edges.map(({ node }) => (
      <ProjectItem key={node.id} project={node} />
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

// function mapStateToProps(state) {
//   const { id } = state.preloaded;
//   const { projects } = state.entities;
//
//   const userProjects = [];
//   Object.keys(projects).forEach((key) => {
//     const project = projects[key];
//     if (project.users.indexOf(id) !== -1) {
//       userProjects.push(project);
//     }
//   });
//
//   return { projects: userProjects };
// }

export default Relay.createContainer(Dashboard, {
  initialVariables: { count: 10 },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        projects(first: $count) {
          edges {
            node {
              id
              ${ProjectItem.getFragment('project')},
            }
          }
        }
      }
    `,
  },
});

// export default connect(mapStateToProps, {
//   loadUserServices,
// })(Dashboard);
