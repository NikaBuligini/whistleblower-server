import React from 'react';
import Loading from '../Loading';

class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projectName: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  handleChange(event) {
    this.setState({ projectName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProject(this.state.projectName);
    this.setState({ projectName: '' });
  }

  render() {
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
          {error && <span className="mdl-textfield__error" style={{ visibility: 'visible' }}>{error}</span>}
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--accent create"
          type="submit"
        >
          Create
        </button>
        {isAdding && <Loading cls="inline-loading" />}
      </form>
    );
  }
}

NewProjectForm.propTypes = {
  isAdding: React.PropTypes.bool.isRequired,
  createProject: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
};

NewProjectForm.defaultProps = {
  error: '',
};

export default NewProjectForm;
