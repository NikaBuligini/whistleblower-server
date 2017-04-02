import React from 'react';
import ProjectCard from '../../components/project/ProjectCard';
import { ProjectPropType } from '../../propTypes';

class ProjectList extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="list">
        {data.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    );
  }
}

ProjectList.propTypes = {
  data: React.PropTypes.arrayOf(ProjectPropType),
};

ProjectList.defaultProps = {
  data: [],
};

export default ProjectList;
