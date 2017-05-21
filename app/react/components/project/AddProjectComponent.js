// @flow

import React from 'react';
// import { connect } from 'react-redux';
// import { createProject } from '../../actions';
import NewProjectForm from './NewProjectForm';

type AddProjectProps = {
  isAdding: boolean,
  error: string,
  viewer: any,
}

class AddProjectComponent extends React.Component {
  static defaultProps = {
    isAdding: false,
    error: '',
  }

  state = {
    showInputs: false,
  }

  props: AddProjectProps

  showInputFields = () => {
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
            viewer={this.props.viewer}
            project={null}
            error={this.props.error}
          />
        )}
      </div>
    );
  }
}

export default AddProjectComponent;
