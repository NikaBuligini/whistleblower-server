import React from 'react';
import { connect } from 'react-redux';
import NewServiceForm from './NewServiceForm';
import { ProjectPropType } from '../../propTypes';

function AddServiceComponent(props) {
  const { error, handleCancel, project } = props;

  return (
    <div className="add">
      {props.showInputs && (
        <NewServiceForm
          error={error}
          handleCancel={handleCancel}
          project={project}
        />
      )}
    </div>
  );
}

AddServiceComponent.propTypes = {
  handleCancel: React.PropTypes.func.isRequired,
  project: ProjectPropType.isRequired,
  showInputs: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string,
};

function mapStateToProps(state) {
  const { error } = state.process.projects;
  return { error };
}

export default connect(mapStateToProps, {

})(AddServiceComponent);