import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { loadProjects, createProject } from '../../actions';
import Loading from '../../components/Loading';
import AddProjectComponent from '../../components/project/AddProjectComponent';
import List from '../../components/project/ProjectList';
import { ProjectPropType } from '../../propTypes';

class ProjectList extends React.Component {
  componentWillMount() {
    this.props.loadProjects();
  }

  render() {
    const { isFetching, projects } = this.props;

    if (isFetching && typeof projects !== 'undefined') {
      return <Loading />;
    }

    return (
      <DocumentTitle title="Projects">
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--10-col mdl-cell--1-offset">
            <div className="projects">
              <AddProjectComponent />
              <List data={projects} />
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

ProjectList.propTypes = {
  projects: React.PropTypes.arrayOf(ProjectPropType).isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  loadProjects: React.PropTypes.func.isRequired,
};

ProjectList.defaultProps = {
  projects: [],
  isFetching: true,
};

function mapStateToProps(state) {
  const { isFetching } = state.process.projects;
  const projects = Object.values(state.entities.projects);
  return { isFetching, projects };
}

export default connect(mapStateToProps, {
  loadProjects, createProject,
})(ProjectList);
