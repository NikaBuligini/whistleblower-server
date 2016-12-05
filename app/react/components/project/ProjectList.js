import React from 'react';
import ProjectCard from '../../components/project/ProjectCard';

class ProjectList extends React.Component {
  componentDidMount() {
    componentHandler.upgradeDom();
  }

  render() {
    const { data } = this.props;
    return (
      <div className="list">
        {Object.keys(data).map((key, index) => <ProjectCard key={index} project={data[key]} />)}
      </div>
    );
  }
}

ProjectList.propTypes = {
  data: React.PropTypes.object,
};

export default ProjectList;
