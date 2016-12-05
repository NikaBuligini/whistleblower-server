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

    if (isFetching) {
      return <Loading cls='loading' />
    }

    if (permissions.length === 0) {
      return <span className='no-data'>No permissions</span>
    }

    return (
      <ul className="list mdl-list">
        {permissions.map((permission, index) => {
          return (
            <PermissionItem
              key={index}
              permission={permission}
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
    let { isFetching, project, permissions } = this.props;
    
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
  project: PropTypes.object
}

PermissionsComponent.defaultProps = {
  isFetching: true
}

function mapStateToProps (state, ownProps) {
  const { isFetching } = state.process.users;
  let permissions = ownProps.project.users
    .map(key => state.entities.users[key])
    .filter(permission => typeof permission !== 'undefined');

  return { isFetching, permissions };
}

export default connect(mapStateToProps, {
  removePermission
})(PermissionsComponent)
