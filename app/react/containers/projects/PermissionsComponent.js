import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AddUserPermissionComponent from '../../components/AddUserPermissionComponent'
import { loadServices, removePermission } from '../../actions'
import Loading from '../../components/Loading'

class PermissionItem extends Component {
  handleDelete () {
    this.props.handlePermissionDelete(this.props.permission);
  }

  render () {
    let { permission, handlePermissionDelete } = this.props;
    return (
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <i className="material-icons mdl-list__item-icon">person</i>
          {permission.fullname}
        </span>
        <span>
          <button
            className="mdl-button mdl-js-button mdl-button--icon"
            onClick={this.handleDelete.bind(this)}
          >
            <i className="material-icons">delete</i>
          </button>
        </span>
      </li>
    );
  }
}

class PermissionsList extends Component {
  render () {
    const { isFetching, permissions, handlePermissionDelete } = this.props;

    if (isFetching && typeof permissions !== 'undefined') {
      return <Loading cls='loading' />
    }

    if (Object.keys(permissions).length === 0) {
      return <span className='no-data'>No permissions</span>
    }

    return (
      <ul className="list mdl-list">
        {Object.keys(permissions).map((key, index) => {
          return (
            <PermissionItem
              key={index}
              permission={permissions[key]}
              handlePermissionDelete={handlePermissionDelete}
            />
          );
        })}
      </ul>
    );
  }
}

class PermissionsComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {isAddingPermission: false};
    this.handleAddingCancel = this.handleAddingCancel.bind(this);
    this.handlePermissionDelete = this.handlePermissionDelete.bind(this);
  }

  handleAddingCancel () {
    this.setState({isAddingPermission: false});
  }

  handlePermissionDelete (permission) {
    this.props.removePermission(permission.id, this.props.project.id);
  }

  render () {
    let { isFetching, project, users } = this.props;

    return (
      <section>
        <div className='title'>
          <h6>Users</h6>
          <span className='actions'>
            <button
              className="mdl-button mdl-js-button mdl-button--accent"
              onClick={() => this.setState({isAddingPermission: true})}
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
        <PermissionsList
          permissions={users}
          handlePermissionDelete={this.handlePermissionDelete}
        />
      </section>
    );
  }
}

PermissionsComponent.propTypes = {
  users: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removePermission: PropTypes.func.isRequired,
  project: PropTypes.object
}

PermissionsComponent.defaultProps = {
  isFetching: true
}

function mapStateToProps (state, ownProps) {
  const { isFetching } = state.process.users;
  let { users } = state.entities;
  let userIds = ownProps.project.users;

  let usersWithPermission = {};
  Object.keys(users).forEach(key => {
    if (userIds.indexOf(key) !== -1) {
      usersWithPermission[key] = users[key];
    }
  });

  return { isFetching, users: usersWithPermission };
}

export default connect(mapStateToProps, {
  removePermission
})(PermissionsComponent)
