/* eslint-disable react/no-unused-prop-types */
// @flow

import React from 'react';
import Relay from 'react-relay';
import DocumentTitle from 'react-document-title';
import Layout from '../layouts/DefaultLayout';
import ProjectItem from './ProjectItem';
import type { Project } from '../../actions/types';

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
}

type DefaultProps = {
  projects: Project[],
}

class Dashboard extends React.Component {
  static defaultProps: DefaultProps;

  static defaultProps = {
    projects: [],
  }

  props: Props;

  render() {
    const { projects } = this.props.viewer;

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
