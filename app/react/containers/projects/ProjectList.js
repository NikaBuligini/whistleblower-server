import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { loadProjects, createProject } from '../../actions';
import Loading from '../../components/Loading';
import AddProjectComponent from '../../components/project/AddProjectComponent';
import List from '../../components/project/ProjectList';

class ProjectList extends Component {
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
  projects: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadProjects: PropTypes.func.isRequired,
};

ProjectList.defaultProps = {
  isFetching: true,
};

function mapStateToProps(state) {
  const { isFetching } = state.process.projects;
  const { projects } = state.entities;
  return { isFetching, projects };
}

export default connect(mapStateToProps, {
  loadProjects, createProject,
})(ProjectList);
