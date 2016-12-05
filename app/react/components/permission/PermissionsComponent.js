import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AddUserPermissionComponent from '../../components/AddUserPermissionComponent';
import { removePermission } from '../../actions';
import PermissionList from './PermissionList';

class PermissionsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isAddingPermission: false };
    this.handleAddingCancel = this.handleAddingCancel.bind(this);
    this.handlePermissionDelete = this.handlePermissionDelete.bind(this);
  }

  handleAddingCancel() {
    this.setState({ isAddingPermission: false });
  }

  handlePermissionDelete(permission) {
    this.props.removePermission(permission.id, this.props.project.id);
  }

  render() {
    const { isFetching, project, permissions } = this.props;

    return (
      <section>
        <div className="title">
          <h6>Users</h6>
          <span className="actions">
            <button
              className="mdl-button mdl-js-button mdl-button--accent"
              onClick={() => this.setState({ isAddingPermission: true })}
            >
              Add permission
            </button>
          </span>
        </div>
        <AddUserPermissionComponent
          showInputs={this.state.isAddingPermission}
          handleCancel={this.handleAddingCancel}
          project={project}
        />
        <PermissionList
          isFetching={isFetching}
          permissions={permissions}
          handlePermissionDelete={this.handlePermissionDelete}
        />
      </section>
    );
  }
}

PermissionsComponent.propTypes = {
  permissions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removePermission: PropTypes.func.isRequired,
  project: PropTypes.object,
};

PermissionsComponent.defaultProps = {
  isFetching: true,
};

function mapStateToProps(state, ownProps) {
  const { isFetching } = state.process.users;
  const permissions = ownProps.project.users
    .map(key => state.entities.users[key])
    .filter(permission => typeof permission !== 'undefined');

  return { isFetching, permissions };
}

export default connect(mapStateToProps, {
  removePermission,
})(PermissionsComponent);
