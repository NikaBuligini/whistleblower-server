import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { loadProject } from '../../actions';
import Loading from '../../components/Loading';
import ServicesComponent from '../../components/service/ServicesComponent';
import PermissionsComponent from '../../components/permission/PermissionsComponent';
import { ProjectPropType } from '../../propTypes';

const ProjectDetails = (props) => {
  const { project } = props;
  const createdAt = new Date(project.createdAt);
  return (
    <section style={{ padding: '12px 0' }}>
      <div>
        <span>{`Created at: ${createdAt.toLocaleDateString()}`}</span>
      </div>
      <div>
        <span>{`Key: ${project.uuid}`}</span>
      </div>
    </section>
  );
};

ProjectDetails.propTypes = {
  project: ProjectPropType.isRequired,
};

class Project extends React.Component {
  componentWillMount() {
    this.props.loadProject(this.props.params.projectName);
  }

  render() {
    const { isFetching, project } = this.props;

    if (isFetching || typeof project === 'undefined') {
      return <Loading />;
    }

    return (
      <DocumentTitle title={project.name}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--8-col mdl-cell--2-offset">
            <section
              className="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--4dp project-detailed"
            >
              <div className="mdl-card__title">
                <h2 className="mdl-card__title-text">
                  {project.name}
                </h2>
              </div>
              <div className="mdl-card__supporting-text">
                <ProjectDetails project={project} />
                <ServicesComponent project={project} />
                <PermissionsComponent project={project} />
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Project.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  loadProject: React.PropTypes.func.isRequired,
  project: ProjectPropType,
  params: React.PropTypes.shape({
    projectName: React.PropTypes.string,
  }).isRequired,
};

Project.defaultProps = {
  isFetching: true,
  project: {},
};

function mapStateToProps(state, ownProps) {
  const { isFetching } = state.process.projects;
  const { projects } = state.entities;

  let project;
  Object.keys(projects).forEach((key) => {
    const val = projects[key];
    if (val.name === ownProps.params.projectName) {
      project = val;
    }
  });

  return { isFetching, project };
}

export default connect(mapStateToProps, {
  loadProject,
})(Project);
