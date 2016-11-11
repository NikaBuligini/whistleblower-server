import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { loadProjects } from '../../actions'
import Loading from '../../components/Loading'
import moment from 'moment'

const ProjectItem = (props) => {
  let { project } = props;
  project.createdAt = new Date(project.createdAt);

  return (
    <div className='item mdl-card mdl-shadow--4dp'>
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">
          <Link
            to={`/projects/${project.name}`}
            className='name'
          >
            {project.name}
          </Link>
        </h2>
      </div>
      <div className="mdl-card__supporting-text">
        <span>Services: {project.services.length}, Secret: {project.uuid}</span>
      </div>
      <div className="mdl-card__actions">
        <a href="(URL or function)">Related Action</a>
      </div>
      <div className='mdl-card-actions'>
        <span
          title={project.createdAt.toLocaleDateString()}
          className="default timespan"
        >
          {moment(project.createdAt).fromNow()}
        </span>

        <button
          id={`${project.name}-actions`}
          className="mdl-button mdl-js-button mdl-button--icon hover"
        >
          <i className="material-icons">more_vert</i>
        </button>

        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
          htmlFor={`${project.name}-actions`}>
          <li className="mdl-menu__item">View</li>
          <li className="mdl-menu__item">Edit</li>
          <li disabled className="mdl-menu__item">Disabled Action</li>
          <li className="mdl-menu__item">Yet Another Action</li>
        </ul>
      </div>
    </div>
  );
}

class ProjectsComponent extends Component {
  componentDidMount () {
    componentHandler.upgradeDom();
  }

  render () {
    let { list } = this.props;
    return (
      <div className='list'>
        {Object.keys(list).map((key, index) => {
          return <ProjectItem key={index} project={list[key]} />;
        })}
      </div>
    );
  }
}

class AddProjectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInputs: false
    };
  }

  componentDidUpdate () {
    componentHandler.upgradeDom();
  }

  showInputFields () {
    this.setState({showInputs: true});
  }

  render () {
    if (!this.state.showInputs) {
      return (
        <div className='add'>
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onClick={this.showInputFields.bind(this)}
          >
            New Project
          </button>
        </div>
      )
    }

    return (
      <div className='add'>
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          onClick={this.showInputFields.bind(this)}
        >
          New Project
        </button>
        <form action="#">
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              id="project-name"
              name="project-name"
            />
            <label className="mdl-textfield__label" htmlFor="project-name">Name</label>
          </div>
          <button
            className="mdl-button mdl-js-button mdl-button--accent create"
          >
            Create
          </button>
        </form>
      </div>
    )
  }
}

class ProjectList extends Component {
  componentWillMount () {
    this.props.loadProjects();
  }

  render () {
    let { isFetching, projects } = this.props;

    if (isFetching && typeof projects !== 'undefined') {
      return <Loading />
    }

    return (
      <div className='mdl-grid'>
        <div className='mdl-cell mdl-cell--10-col mdl-cell--1-offset'>
          <div className='projects'>
            <AddProjectComponent />
            <ProjectsComponent list={projects} />
          </div>
        </div>
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
