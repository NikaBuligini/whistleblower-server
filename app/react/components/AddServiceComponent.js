import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addService } from '../actions'
import Loading from './Loading'

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {serviceName: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    componentHandler.upgradeDom();
  }

  handleChange (event) {
    this.setState({serviceName: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.addService(this.state.serviceName, this.props.project.name);
    this.props.handleCancel();
  }

  render () {
    const { error } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="service-form">
        <div className="mdl-textfield mdl-js-textfield">
          <input
            className="mdl-textfield__input"
            type="text"
            id="service-name"
            autoComplete="off"
            autoFocus="on"
            onChange={this.handleChange}
            value={this.state.serviceName}
          />
          <label className="mdl-textfield__label" htmlFor="service-name">Name</label>
          {error && <span className="mdl-textfield__error" style={{visibility: 'visible'}}>{error}</span>}
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--accent add-service"
          type="submit"
        >
          Add
        </button>
        <button
          className="mdl-button mdl-js-button mdl-button--primary cancel"
          type="button"
          onClick={this.props.handleCancel}
        >
          Cancel
        </button>
      </form>
    )
  }
}

class AddServiceComponent extends Component {
  render () {
    const { error, addService, handleCancel, project } = this.props;

    return (
      <div className='add'>
        {this.props.showInputs && (
          <FormComponent
            error={error}
            addService={addService}
            handleCancel={handleCancel}
            project={project}
          />
        )}
      </div>
    )
  }
}

AddServiceComponent.propTypes = {
  error: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  addService: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  const { error } = state.process.projects;
  return { error }
}

export default connect(mapStateToProps, {
  addService
})(AddServiceComponent)
