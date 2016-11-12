import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../actions'
import Loading from './Loading'

class AddProjectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInputs: false,
      projectName: ''
    };
    this.showInputFields = this.showInputFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate () {
    componentHandler.upgradeDom();
  }

  showInputFields () {
    this.setState({showInputs: true});
  }

  handleChange (event) {
    this.setState({projectName: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.createProject(this.state.projectName);
  }

  render () {
    if (!this.state.showInputs) {
      return (
        <div className='add'>
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onClick={this.showInputFields}
          >
            New Project
          </button>
        </div>
      )
    }

    let { isAdding, error } = this.props;

    return (
      <div className='add'>
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          onClick={this.showInputFields}
        >
          New Project
        </button>
        <form onSubmit={this.handleSubmit}>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className="mdl-textfield__input"
              type="text"
              id="project-name"
              autoComplete="off"
              autoFocus="on"
              onChange={this.handleChange}
              value={this.state.projectName}
            />
            <label className="mdl-textfield__label" htmlFor="project-name">Name</label>
            {error && <span className="mdl-textfield__error" style={{visibility: 'visible'}}>{error}</span>}
          </div>
          <button
            className="mdl-button mdl-js-button mdl-button--accent create"
            type="submit"
          >
            Create
          </button>
          {isAdding && <Loading cls="inline-loading" />}
        </form>
      </div>
    )
  }
}

AddProjectComponent.propTypes = {
  isAdding: PropTypes.bool.isRequired,
  error: PropTypes.string,
  createProject: PropTypes.func.isRequired
}

AddProjectComponent.defaultProps = {
  isAdding: false
}

function mapStateToProps (state, ownProps) {
  const { isAdding, error } = state.process.projects;
  return {
    isAdding,
    error
  }
}

export default connect(mapStateToProps, {
  createProject
})(AddProjectComponent)
