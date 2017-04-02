import React from 'react';
import { connect } from 'react-redux';
import NewPermissionForm from './NewPermissionForm';
import { ProjectPropType } from '../../propTypes';

function AddUserPermissionComponent(props) {
  const { error, handleCancel, project } = props;

  return (
    <div className="add">
      {props.showInputs && (
        <NewPermissionForm
          error={error}
          handleCancel={handleCancel}
          project={project}
        />
      )}
    </div>
  );
}

AddUserPermissionComponent.propTypes = {
  showInputs: React.PropTypes.bool.isRequired,
  handleCancel: React.PropTypes.func.isRequired,
  project: ProjectPropType.isRequired,
  error: React.PropTypes.string,
};

AddUserPermissionComponent.defaultProps = {
  error: '',
};

function mapStateToProps(state) {
  const { error } = state.process.projects;
  return { error };
}

export default connect(mapStateToProps, {

})(AddUserPermissionComponent);
