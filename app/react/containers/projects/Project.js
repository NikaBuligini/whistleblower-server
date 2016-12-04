import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import ServicesComponent from './ServicesComponent'
import { loadProject } from '../../actions'
import Loading from '../../components/Loading'
import PermissionsComponent from './PermissionsComponent'

class Project extends Component {
  componentWillMount () {
    this.props.loadProject(this.props.params.projectName);
  }

  render () {
    let { isFetching, project } = this.props;

    if (isFetching || typeof project === 'undefined') {
      return <Loading />
    }

    return (
      <DocumentTitle title={project.name}>
        <div className='mdl-grid'>
          <div className='mdl-cell mdl-cell--8-col mdl-cell--2-offset'>
            <section className='section--center mdl-grid mdl-grid--no-spacing mdl-shadow--4dp project-detailed'>
              <div className='mdl-card__title'>
                <h2 className='mdl-card__title-text'>
                  {project.name}
                </h2>
              </div>
              <div className='mdl-card__supporting-text'>
                <ServicesComponent
                  project={project}
                />
                <PermissionsComponent
                  project={project}
                />
              </div>
            </section>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

Project.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  project: PropTypes.object
}

Project.defaultProps = {
  isFetching: true
}

function mapStateToProps (state, ownProps) {
  const { isFetching } = state.process.projects;
  const { projects } = state.entities;

  let project = undefined;
  Object.keys(projects).forEach((key) => {
    let val = projects[key];
    if (val.name === ownProps.params.projectName) {
      project = val;
    }
  })

  return { isFetching, project };
}

export default connect(mapStateToProps, {
  loadProject
})(Project)
