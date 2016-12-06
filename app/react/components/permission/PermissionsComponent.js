import React from 'react';
import { connect } from 'react-redux';
import AddUserPermissionComponent from './AddUserPermissionComponent';
import { removePermission } from '../../actions';
import PermissionList from './PermissionList';
import { ProjectPropType, UserPropType } from '../../propTypes';

class PermissionsComponent extends React.Component {
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
  permissions: React.PropTypes.arrayOf(UserPropType).isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  removePermission: React.PropTypes.func.isRequired,
  project: ProjectPropType.isRequired,
};

PermissionsComponent.defaultProps = {
  permissions: [],
  isFetching: true,
};

function mapStateToProps(state, ownProps) {
  const { isFetching } = state.process.users;
  const permissions = [];

  ownProps.project.users
    .forEach((key) => {
      const permission = state.entities.users[key];
      if (typeof permission !== 'undefined') {
        permissions.push(permission);
      }
    });

  return { isFetching, permissions };
}

export default connect(mapStateToProps, {
  removePermission,
})(PermissionsComponent);
