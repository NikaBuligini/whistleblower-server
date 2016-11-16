import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../actions'
import Loading from './Loading'

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {projectName: props.projectName && ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    componentHandler.upgradeDom();
    // var notification = document.querySelector('.mdl-js-snackbar');
    // var data = {
    //   message: 'Message Sent',
    //   actionHandler (event) {},
    //   actionText: 'Undo',
    //   timeout: 10000
    // };
    // notification.MaterialSnackbar.showSnackbar(data);
  }

  handleChange (event) {
    this.setState({projectName: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.createProject(this.state.projectName);
  }

  render () {
    const { error, isAdding } = this.props;

    return (
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
    )
  }
}

class AddProjectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {showInputs: false};
    this.showInputFields = this.showInputFields.bind(this);
  }

  showInputFields () {
    this.setState({showInputs: true});
  }

  render () {
    return (
      <div className='add'>
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          onClick={this.showInputFields}
        >
          New Project
        </button>
        {this.state.showInputs && (
          <FormComponent
            isAdding={this.props.isAdding}
            error={this.props.error}
            createProject={this.props.createProject}
          />
        )}
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
  return { isAdding, error }
}

export default connect(mapStateToProps, {
  createProject
})(AddProjectComponent)
