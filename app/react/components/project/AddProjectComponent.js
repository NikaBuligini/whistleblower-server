import React from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../actions';
import NewProjectForm from './NewProjectForm';

class AddProjectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showInputs: false };
    this.showInputFields = this.showInputFields.bind(this);
  }

  showInputFields() {
    this.setState({ showInputs: true });
  }

  render() {
    return (
      <div className="add">
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          onClick={this.showInputFields}
        >
          New Project
        </button>
        {this.state.showInputs && (
          <NewProjectForm
            isAdding={this.props.isAdding}
            error={this.props.error}
            createProject={this.props.createProject}
          />
        )}
      </div>
    );
  }
}

AddProjectComponent.propTypes = {
  isAdding: React.PropTypes.bool.isRequired,
  createProject: React.PropTypes.func.isRequired,
  error: React.PropTypes.string,
};

AddProjectComponent.defaultProps = {
  isAdding: false,
};

function mapStateToProps(state) {
  const { isAdding, error } = state.process.projects;
  return { isAdding, error };
}

export default connect(mapStateToProps, {
  createProject,
})(AddProjectComponent);
