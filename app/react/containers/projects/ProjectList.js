import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { loadProjects } from '../../actions'
import Loading from '../../components/Loading'

class Project extends Component {
  render () {
    let { project } = this.props;
    let createdAt = new Date(project.createdAt);

    return (
      <li className='project card'>
        <h4>{project.name}</h4>
        <span className='created-at'>{createdAt.toLocaleDateString()}</span>
        <span>Services: {project.services.length}, Secret: {project.uuid}</span>
      </li>
    );
  }
}

function loadData (props) {
  props.loadProjects()
}

class ProjectList extends Component {
  componentWillMount () {
    loadData(this.props)
  }

  render () {
    let { isFetching, projects } = this.props;

    if (isFetching && typeof projects !== 'undefined') {
      return <Loading />
    }

    return (
      <div className='projects-list'>
        <ul>
          {Object.keys(projects).map((key, index) => {
            return (
              <Project
                key={index}
                project={projects[key]}
              />
            );
          })}
        </ul>
      </div>
    )
  }
}

ProjectList.propTypes = {
  projects: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadProjects: PropTypes.func.isRequired
}

ProjectList.defaultProps = {
  isFetching: true
}

function mapStateToProps (state, ownProps) {
  const { isFetching } = state.process.projects;
  const { projects } = state.entities;
  return {
    isFetching,
    projects
  }
}

export default connect(mapStateToProps, {
  loadProjects
})(ProjectList)
