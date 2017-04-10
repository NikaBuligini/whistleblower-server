import React from 'react';
import ProjectCard from '../../components/project/ProjectCard';
import type { Project } from '../../actions/types';

type ProjectListProps = {
  data: Array<Project>,
}

class ProjectList extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  props: ProjectListProps

  render() {
    const { data } = this.props;
    return (
      <div className="list">
        {data.map(({ node }) => <ProjectCard key={node.id} project={node} />)}
      </div>
    );
  }
}

export default ProjectList;
